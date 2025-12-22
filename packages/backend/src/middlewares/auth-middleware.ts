import { NextFunction, Request, Response } from 'express';
import { StatusCode } from 'status-code-enum';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.ts';
import { prisma } from '../lib/prisma.ts';

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // read the req auth header. if missing or not prefixed correctly, the request is rejected
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(StatusCode.ClientErrorUnauthorized)
      .json({ error: 'Access denied: no token or invalid format' });
  }

  // split header to extract token
  const token = authHeader.split(' ')[1];

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      username: true,
    },
  });

  if (!user) {
    return res
      .status(StatusCode.ClientErrorUnauthorized)
      .json({ error: 'Access denied: invalid token - user not found' });
  }

  req.user = user;
  next();
};
