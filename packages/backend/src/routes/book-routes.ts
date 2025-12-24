import express from 'express';
import {
  createBookController,
  getAllBooksController,
} from '../controllers/book-controller.ts';
import { protect } from '../middlewares/auth-middleware.ts';
import { asyncHandler } from '../utils/asyncHandler.ts';

const bookRouter = express.Router();

bookRouter.post('/create', asyncHandler(protect), createBookController);
bookRouter.get('/getAllBooks', asyncHandler(protect), getAllBooksController);

export default bookRouter;
