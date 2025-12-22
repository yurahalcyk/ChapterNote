import { BookDetails } from '../dto/book-dto.ts';
import { BookCreationError, ValidationError } from '../errors/custom-errors.ts';
import { prisma } from '../lib/prisma.ts';

const bookService = {
  createBook: async (book: BookDetails, userId: number) => {
    // handle input validation & errors
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
    try {
      const createdBook = await prisma.book.create({
        data: {
          title: book.title.trim(),
          author: book.author.trim(),
          chapters: book.chapters,
          pages: book.pages ?? null,
          userId,
        },
      });

      return createdBook;
    } catch (err) {
      console.error('unexpected err: ' + err);
      throw new BookCreationError('Failed to create book');
    }
  },
  getBook: async () => {},
  deleteBook: async () => {},
  updateBook: async () => {},
};

export default bookService;
