import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import request from 'supertest';
import bookService from '../../services/book-service.ts';
import {
  bookDetailsRequest,
  successfulCreateBookResponse,
  validBook,
} from '../mocks/book-mock.ts';
import app from '../../app.ts';
import { mockAuth } from '../helpers/mock-auth.ts';
import { ValidationError } from '../../errors/custom-errors.ts';

const CREATE_BOOK_API_PATH = '/api/books/create';

describe('Book Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuth();
  });

  describe('Book Controller - Create', () => {
    it('returns 201 when book successfully created', async () => {
      jest.spyOn(bookService, 'createBook').mockResolvedValue(validBook);

      const res = await request(app)
        .post(`${CREATE_BOOK_API_PATH}`)
        .set('Authorization', 'Bearer fake-valid-token')
        .send(bookDetailsRequest);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(successfulCreateBookResponse);
    });

    it('returns 400 when book without title submitted', async () => {
      jest
        .spyOn(bookService, 'createBook')
        .mockRejectedValue(new ValidationError('Book title is required'));

      const res = await request(app)
        .post(`${CREATE_BOOK_API_PATH}`)
        .set('Authorization', 'Bearer fake-valid-token')
        .send({ ...bookDetailsRequest, title: '' });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: 'Book title is required',
        name: 'ValidationError',
      });
    });

    it('returns 400 when book without author submitted', async () => {
      jest
        .spyOn(bookService, 'createBook')
        .mockRejectedValue(new ValidationError('Book author is required'));

      const res = await request(app)
        .post(`${CREATE_BOOK_API_PATH}`)
        .set('Authorization', 'Bearer fake-valid-token')
        .send({ ...bookDetailsRequest, author: '' });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: 'Book author is required',
        name: 'ValidationError',
      });
    });
  });
});
