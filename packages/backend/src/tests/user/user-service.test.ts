import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { prismaMock } from '../../../singleton.ts';
import { RegistrationRequest, validCreatedUser } from '../mocks/user-mock.ts';
import utils from '../../utils/user-utils.ts';
import userService from '../../services/user-service.ts';
import jwt from 'jsonwebtoken';

describe('User Service', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('Register User', () => {
    it('throws an error if username already exists', async () => {
      prismaMock.user.findFirst.mockResolvedValue(validCreatedUser);

      await expect(
        userService.registerUser(RegistrationRequest),
      ).rejects.toThrow('Username already in use');

      expect(prismaMock.user.findFirst).toHaveBeenCalledTimes(1);
    });

    it('throws an error if email already exists', async () => {
      prismaMock.user.findFirst.mockResolvedValue(validCreatedUser);

      await expect(
        userService.registerUser({
          ...RegistrationRequest,
          username: 'diffUsername',
        }),
      ).rejects.toThrow('Email already in use');

      expect(prismaMock.user.findFirst).toHaveBeenCalledTimes(1);
    });

    it('creates a user successfully', async () => {
      const hashSpy = jest
        .spyOn(utils, 'hashPassword')
        .mockResolvedValue('hashed-pw');

      prismaMock.user.findFirst.mockResolvedValue(null);

      prismaMock.user.create.mockResolvedValue({
        ...validCreatedUser,
        password: 'hashed-pw',
      });

      const result = await userService.registerUser(RegistrationRequest);

      expect(result).toEqual({
        ...RegistrationRequest,
        id: 1,
        password: 'hashed-pw',
      });

      expect(hashSpy).toHaveBeenCalledWith(RegistrationRequest.password);
      expect(hashSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Login User', () => {
    it('throws an error if no username exists', async () => {
      await expect(userService.loginUser(RegistrationRequest)).rejects.toThrow(
        'Invalid username or password',
      );

      expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
    });

    it('throws an error if incorrect password entered', async () => {
      prismaMock.user.findUnique.mockResolvedValueOnce(validCreatedUser);
      const verifyPasswordSpy = jest
        .spyOn(utils, 'verifyPassword')
        .mockResolvedValue(false);

      await expect(
        userService.loginUser({ ...RegistrationRequest, password: 'wrong pw' }),
      ).rejects.toThrow('Invalid username or password');

      expect(verifyPasswordSpy).toHaveBeenCalledWith(
        'wrong pw',
        validCreatedUser.password,
      );
    });

    it('logs user in successfully', async () => {
      prismaMock.user.findUnique.mockResolvedValueOnce(validCreatedUser);
      jest.spyOn(utils, 'verifyPassword').mockResolvedValue(true);
      jest.spyOn(jwt as any, 'sign').mockReturnValue('signedToken');

      const result = await userService.loginUser(RegistrationRequest);

      expect(result).toEqual('signedToken');
    });
  });
});
