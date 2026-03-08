import express from 'express';
import {
  createBookController,
  editBookController,
  getAllBooksController,
  getBookController,
} from '../controllers/book-controller.ts';
import { protect } from '../middlewares/auth-middleware.ts';
import { asyncHandler } from '../utils/asyncHandler.ts';

const bookRouter = express.Router();

bookRouter.post('/create', asyncHandler(protect), createBookController);
bookRouter.get('/all-books', asyncHandler(protect), getAllBooksController);
bookRouter.put('/:bookId', asyncHandler(protect), editBookController);
bookRouter.get('/:bookId', asyncHandler(protect), getBookController);

export default bookRouter;
