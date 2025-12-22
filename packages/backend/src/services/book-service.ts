import { BookDetails } from '../dto/book-dto.ts';
import { ValidationError } from '../errors/custom-errors.ts';
import { prisma } from '../lib/prisma.ts';

// dont need try catch - lets unexpected errors bubble up and they'll be caught by asyncHandler + global err handler

const bookService = {
  createBook: async (book: BookDetails, userId: number) => {
    // handle input validation (client side errors) -> 400 err response
    if (!book.title.trim()) {
      throw new ValidationError('Book title is required');
    }

    if (!book.author.trim()) {
      throw new ValidationError('Book author is required');
    }

    if (!book.chapters) {
      throw new ValidationError('Book chapters is required');
    }

    // add to db
    return await prisma.book.create({
      data: {
        title: book.title.trim(),
        author: book.author.trim(),
        chapters: book.chapters,
        pages: book.pages ?? null,
        userId,
      },
    });
  },

  getBooks: async (userId: number) => {
    const books = await prisma.book.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return books;
  },

  deleteBook: async () => {},
  updateBook: async () => {},
};

export default bookService;
