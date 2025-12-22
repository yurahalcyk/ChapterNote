import express from 'express';
import cors from 'cors';
import userRouter from './routes/user-routes.ts';
import bookRouter from './routes/book-routes.ts';
import { StatusCode } from 'status-code-enum';
import { BookCreationError, ValidationError } from './errors/custom-errors.ts';

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);

// Global error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error('global err handler -> err: ' + err);

    // validation errors
    if (err instanceof ValidationError) {
      return res
        .status(StatusCode.ClientErrorBadRequest)
        .json({ error: err.message, name: err.name });
    }

    // book creation errors
    if (err instanceof BookCreationError) {
      return res
        .status(StatusCode.ClientErrorBadRequest)
        .json({ error: err.message, name: err.name });
    }

    // capture all other errors
    res
      .status(StatusCode.ServerErrorInternal)
      .json({ error: 'Something went wrong!' });
  },
);

export default app;
