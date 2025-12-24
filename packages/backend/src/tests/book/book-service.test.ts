import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { prismaMock } from '../../../singleton.ts';
import {
  bookDetailsRequest,
  collectionOfBooks,
  validBook,
} from '../mocks/book-mock.ts';
import bookService from '../../services/book-service.ts';

describe('Book Service', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('Create Book', () => {
    it('creates a book successfully', async () => {
      prismaMock.book.create.mockResolvedValue(validBook);
      const result = await bookService.createBook(bookDetailsRequest, 1);
      expect(result).toEqual(validBook);
    });
    it('throws validation error if book title missing', async () => {
      await expect(
        bookService.createBook({ ...bookDetailsRequest, title: '' }, 1),
      ).rejects.toThrow('Book title is required');
    });
    it('throws validation error if book author missing', async () => {
      await expect(
        bookService.createBook({ ...bookDetailsRequest, author: '' }, 1),
      ).rejects.toThrow('Book author is required');
    });
  });

  describe('Get Book', () => {
    it('returns array of books if user has books', async () => {
      prismaMock.book.findMany.mockResolvedValue(collectionOfBooks);
      const result = await bookService.getBooks(1);
      expect(result).toEqual(collectionOfBooks);
    });
    it('returns empty array of books if user has no books', async () => {
      prismaMock.book.findMany.mockResolvedValue([]);
      const result = await bookService.getBooks(1);
      expect(result).toEqual([]);
    });
  });
});
