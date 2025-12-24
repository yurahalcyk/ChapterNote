import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma.ts';
import { jest } from '@jest/globals';

type MockAuthOptions = {
  userId?: number;
  user?: {
    id: number;
    email: string;
    username: string;
    password: string;
  };
};

export const mockAuth = (options?: MockAuthOptions) => {
  const userId = options?.userId ?? 1;
  const user = options?.user ?? {
    id: userId,
    email: 'test@test.com',
    username: 'testuser',
    password: 'test',
  };

  jest.spyOn(jwt, 'verify').mockReturnValue({ userId } as any);
  jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);
};
