import { prisma } from '../lib/prisma.ts';
import {
  userLoginDataObject,
  UserRegistrationDataObject,
} from '../types/user-types.ts';
import utils from '../utils/user-utils.ts';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.ts';

const userService = {
  registerUser: async (
    registrationDetails: UserRegistrationDataObject,
  ): Promise<UserRegistrationDataObject> => {
    const existingUserName = await prisma.user.findUnique({
      where: { username: registrationDetails.username },
    });
    if (existingUserName) {
      throw new Error('Username already in use');
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email: registrationDetails.email },
    });
    if (existingEmail) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await utils.hashPassword(
      registrationDetails.password,
    );

    return await prisma.user.create({
      data: {
        ...registrationDetails,
        password: hashedPassword,
      },
    });
  },

  loginUser: async (loginDetails: userLoginDataObject): Promise<string> => {
    const existingUser = await prisma.user.findUnique({
      where: { username: loginDetails.username },
    });
    if (!existingUser) {
      throw new Error(`Username: ${loginDetails.username} not found`);
    }

    const isMatch = await utils.verifyPassword(
      loginDetails.password,
      existingUser.password,
    );
    if (!isMatch) {
      throw new Error('Incorrect password');
    }

    const token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      JWT_SECRET,
      {
        expiresIn: '2d',
      },
    );

    return token;
  },
};

export default userService;
