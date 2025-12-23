import { Request, Response } from 'express';
import { StatusCode } from 'status-code-enum';
import userService from '../services/user-service.ts';
import { userLoginDTO, UserRegistrationDTO } from '../dto/user-dto.ts';
import { asyncHandler } from '../utils/asyncHandler.ts';

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userData = req.body as UserRegistrationDTO;

    await userService.registerUser(userData);

    return res
      .status(StatusCode.SuccessCreated)
      .json({ message: 'User created' });
  },
);

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userInput = req.body as userLoginDTO;

    const token = await userService.loginUser(userInput);

    return res
      .status(StatusCode.SuccessOK)
      .json({ message: 'Login successful', token: token });
  },
);
