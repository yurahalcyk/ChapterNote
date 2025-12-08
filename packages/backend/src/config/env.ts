import dotenv from 'dotenv';

// centralising env validation
// node wont start the server unless these env variables are available
// as any file imported is fully executed before app.listen() is reached
// and this is imported in the server.ts file
dotenv.config({ path: '../../.env', quiet: true });

if (!process.env.PORT) {
  throw new Error('PORT is missing');
} else if (!process.env.NODE_ENV) {
  throw new Error('NODE ENV is missing');
} else if (!process.env.JWT_SECRET) {
  throw new Error('JWT SECRET is missing');
} else if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE URL is missing');
}

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const DATABASE_URL = process.env.DATABASE_URL;
