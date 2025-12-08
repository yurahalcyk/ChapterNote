import express from 'express';
import cors from 'cors';
import userRouter from './routes/user-routes.ts';

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(express.json());
app.use('/api/users', userRouter);

export default app;
