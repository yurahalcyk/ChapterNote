import { Request, Response } from 'express';
import { StatusCode } from 'status-code-enum';
import userService from '../services/user-service.ts';
import {
  userLoginDataObject,
  UserRegistrationDataObject,
} from '../types/user-types.ts';

export const registerUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userData = req.body as UserRegistrationDataObject;
  try {
    await userService.registerUser(userData);
    res.status(StatusCode.SuccessCreated).json({ message: 'User created' });
  } catch (err: any) {
    const knownErrors = ['Username already in use', 'Email already in use'];
    if (knownErrors.includes(err.message)) {
      res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
    }
    res
      .status(StatusCode.ServerErrorInternal)
      .json({ error: 'Something went wrong' });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const userInput = req.body as userLoginDataObject;
  try {
    const token = await userService.loginUser(userInput);
    res
      .status(StatusCode.SuccessOK)
      .json({ message: 'Login successful', token: token });
  } catch (err: any) {
    const knownErrors = [
      `Username: ${userInput.username} not found`,
      'Incorrect password',
    ];
    if (knownErrors.includes(err.message)) {
      res.status(StatusCode.ClientErrorBadRequest).json({ error: err.message });
    }
    res
      .status(StatusCode.ServerErrorInternal)
      .json({ error: 'Something went wrong' });
  }
};
