import express from 'express';
import {
  createBookController,
  getBookController,
} from '../controllers/book-controller.ts';
import { protect } from '../middlewares/auth-middleware.ts';
import { asyncHandler } from '../utils/asyncHandler.ts';

const bookRouter = express.Router();

bookRouter.post('/create', asyncHandler(protect), createBookController);
bookRouter.get('/getBooks', asyncHandler(protect), getBookController);

export default bookRouter;
