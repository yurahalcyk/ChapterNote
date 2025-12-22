import { Request, Response } from 'express';
import { StatusCode } from 'status-code-enum';
import userService from '../services/user-service.ts';
import { userLoginDTO, UserRegistrationDTO } from '../dto/user-dto.ts';
import { asyncHandler } from '../utils/asyncHandler.ts';

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userData = req.body as UserRegistrationDTO;
    try {
      await userService.registerUser(userData);
    } catch (err: any) {
      const knownErrors = ['Username already in use', 'Email already in use'];
      if (knownErrors.includes(err.message)) {
        return res
          .status(StatusCode.ClientErrorBadRequest)
          .json({ error: err.message });
      }
      return res
        .status(StatusCode.ServerErrorInternal)
        .json({ error: 'Something went wrong' });
    }
    return res
      .status(StatusCode.SuccessCreated)
      .json({ message: 'User created' });
  },
);

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userInput = req.body as userLoginDTO;
    let token: string;

    try {
      token = await userService.loginUser(userInput);
    } catch (err: any) {
      const knownErrors = [
        `Username: ${userInput.username} not found`,
        'Incorrect password',
      ];
      if (knownErrors.includes(err.message)) {
        return res
          .status(StatusCode.ClientErrorBadRequest)
          .json({ error: err.message });
      }
      return res
        .status(StatusCode.ServerErrorInternal)
        .json({ error: 'Something went wrong' });
    }

    return res
      .status(StatusCode.SuccessOK)
      .json({ message: 'Login successful', token: token });
  },
);
