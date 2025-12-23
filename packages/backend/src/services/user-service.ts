import { prisma } from '../lib/prisma.ts';
import { userLoginDTO, UserRegistrationDTO } from '../dto/user-dto.ts';
import utils from '../utils/user-utils.ts';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.ts';
import { ValidationError } from '../errors/custom-errors.ts';

const userService = {
  /**
   * Register a new user
   * @param registrationDetails user submitted registration details
   * @throws ValidationError on duplicate username/email or invalid data
   */
  registerUser: async (registrationDetails: UserRegistrationDTO) => {
    const { username, email, password } = registrationDetails;

    // input validation
    if (!username.trim() || !email.trim() || !password) {
      throw new ValidationError('All fields are required');
    }

    // checks
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username.trim() },
          { email: email.trim().toLowerCase() },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.username === username.trim()) {
        throw new ValidationError('Username already in use');
      }
      if (existingUser.email === email.trim().toLowerCase()) {
        throw new ValidationError('Email already in use');
      }
    }

    const hashedPassword = await utils.hashPassword(
      registrationDetails.password,
    );

    const user = await prisma.user.create({
      data: {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    return user;
  },

  /**
   * Login user
   * @param loginDetails user inputted login details
   * @throws ValidationError on invalid credentials
   * @returns JWT
   */
  loginUser: async (loginDetails: userLoginDTO) => {
    const { username, password } = loginDetails;

    const user = await prisma.user.findUnique({
      where: { username: username.trim() },
      select: { id: true, password: true },
    });

    if (!user) {
      throw new ValidationError(`Invalid username or password`);
    }

    const isMatch = await utils.verifyPassword(password, user.password);
    if (!isMatch) {
      throw new ValidationError('Invalid username or password');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '2d',
    });

    return token;
  },
};

export default userService;
