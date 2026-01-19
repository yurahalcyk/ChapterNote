import { StatusCode } from 'status-code-enum';
import { Response, Request } from 'express';
import bookService from '../services/book-service.ts';
import { BookDetails } from '../dto/book-dto.ts';
import { asyncHandler } from '../utils/asyncHandler.ts';

export const createBookController = asyncHandler(
  async (req: Request, res: Response) => {
    // req.user is guaranteed to exist here because protect runs first
    const bookData = req.body as BookDetails;

    const book = await bookService.createBook(bookData, req.user!.id);

    return res.status(StatusCode.SuccessCreated).json({
      message: 'Book created successfully',
      book,
    });
  },
);

export const getAllBooksController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const books = await bookService.getBooks(userId);
    const message =
      books.length > 0 ? 'Books successfully fetched' : 'No books found';
    return res.status(StatusCode.SuccessOK).json({
      message,
      count: books.length,
      books,
    });
  },
);

export const deleteBookController = asyncHandler(
  async (_req: Request, _res: Response) => {
    // will get book id from req.params
  },
);
