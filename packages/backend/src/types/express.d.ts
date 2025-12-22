import { User } from '../../prisma-output/generated/prisma/client.ts';

// this is called type/module augmentation -> telling TS every request object may have an optional user property
// necessary because TypeScript and Express don't know about the custom property req.user that I want to add to the request object

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, 'password'>;
      // Full user object attached after successful auth. Optional as its not present on every request (only after protect MW runs)
    }
  }
}
