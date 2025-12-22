import express from 'express';
import { createBookController } from '../controllers/book-controller.ts';
import { protect } from '../middlewares/auth-middleware.ts';
import { asyncHandler } from '../utils/asyncHandler.ts';

const bookRouter = express.Router();

bookRouter.post('/create', asyncHandler(protect), createBookController);

export default bookRouter;
