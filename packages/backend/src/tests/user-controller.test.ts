import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import request from 'supertest';
import app from '../app.ts';
import {
  loginRequest,
  RegistrationRequest,
  validCreatedUser,
} from '../mocks/user-mock.ts';
import userService from '../services/user-service.ts';

const REGISTER_USER_API_PATH = '/api/users/register';
const LOGIN_USER_API_PATH = '/api/users/login';

describe('User Controller', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  describe('User Registration Controller', () => {
    it('returns 201 when user is created', async () => {
      jest
        .spyOn(userService, 'registerUser')
        .mockResolvedValue({ ...validCreatedUser });

      const res = await request(app)
        .post(`${REGISTER_USER_API_PATH}`)
        .send(RegistrationRequest);

      expect(res.status).toBe(201);
      expect(res.body).toEqual({ message: 'User created' });
      expect(userService.registerUser).toHaveBeenCalledWith(
        RegistrationRequest,
      );
    });

    it('returns 400 when username is taken', async () => {
      jest
        .spyOn(userService, 'registerUser')
        .mockRejectedValue(new Error('Username already in use'));

      const res = await request(app)
        .post(`${REGISTER_USER_API_PATH}`)
        .send(RegistrationRequest);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Username already in use' });
    });

    it('returns 400 when email is taken', async () => {
      jest
        .spyOn(userService, 'registerUser')
        .mockRejectedValue(new Error('Email already in use'));

      const res = await request(app)
        .post(`${REGISTER_USER_API_PATH}`)
        .send(RegistrationRequest);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Email already in use' });
    });

    it('returns 500 when unexpected error occurs', async () => {
      jest
        .spyOn(userService, 'registerUser')
        .mockRejectedValue(new Error('Something unexpected happened'));

      const res = await request(app)
        .post(`${REGISTER_USER_API_PATH}`)
        .send(RegistrationRequest);

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Something went wrong' });
    });
  });

  describe('Login Controller', () => {
    it('returns 200 if login successful', async () => {
      jest.spyOn(userService, 'loginUser').mockResolvedValue('signedToken');

      const res = await request(app)
        .post(`${LOGIN_USER_API_PATH}`)
        .send(loginRequest);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        message: 'Login successful',
        token: 'signedToken',
      });
    });

    it('returns 400 if username not registered', async () => {
      jest
        .spyOn(userService, 'loginUser')
        .mockRejectedValue(
          new Error(`Username: ${loginRequest.username} not found`),
        );

      const res = await request(app)
        .post(`${LOGIN_USER_API_PATH}`)
        .send(loginRequest);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: `Username: ${loginRequest.username} not found`,
      });
    });

    it('returns 400 if incorrect password entered', async () => {
      jest
        .spyOn(userService, 'loginUser')
        .mockRejectedValue(new Error(`Incorrect password`));

      const res = await request(app)
        .post(`${LOGIN_USER_API_PATH}`)
        .send(loginRequest);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: `Incorrect password`,
      });
    });

    it('returns 500 when unexpected error occurs', async () => {
      jest
        .spyOn(userService, 'loginUser')
        .mockRejectedValue(new Error(`db error`));

      const res = await request(app)
        .post(`${LOGIN_USER_API_PATH}`)
        .send(loginRequest);

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        error: `Something went wrong`,
      });
    });
  });
});
