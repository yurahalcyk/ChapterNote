import { PrismaClient } from './prisma-output/generated/prisma/client.ts';
import { mockDeep, mockReset } from 'jest-mock-extended';
import { beforeEach, jest } from '@jest/globals';

// Prisma ORM docs:
// singleton file tells Jest to mock a named export (the Prisma Client instance in ./client.ts)
// and uses the mockDeep method from jest-mock-extended to enable access to the objects and methods available on Prisma Client.
// It then resets the mocked instance before each test is run.

export const prismaMock = mockDeep<PrismaClient>();

jest.mock('./src/lib/prisma.ts', () => ({
  __esModule: true,
  prisma: prismaMock,
}));

beforeEach(() => {
  mockReset(prismaMock);
});
