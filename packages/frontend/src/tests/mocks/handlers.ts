import { http, HttpResponse } from 'msw';
import { LoginRequestBody, RegisterRequestBody } from './handler-types';

const LOGIN_URL = 'http://localhost:3000/api/users/login';
const REGISTER_URL = 'http://localhost:3000/api/users/register';

export const handlers = [
  // LOGIN
  http.post(`${LOGIN_URL}`, async ({ request }) => {
    const body = (await request.json()) as LoginRequestBody;
    if (body.username !== 'valid-username') {
      return HttpResponse.json(
        {
          error: 'Username: invalid-username not found',
        },
        { status: 400 },
      );
    }

    if (body.password !== 'correct-pw') {
      return HttpResponse.json(
        {
          error: 'Incorrect password',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        message: 'Login successful',
        token: 'fake token',
      },
      { status: 200 },
    );
  }),

  // REGISTER
  http.post(`${REGISTER_URL}`, async ({ request }) => {
    const body = (await request.json()) as RegisterRequestBody;

    if (body.username !== 'free-username') {
      return HttpResponse.json(
        {
          error: 'Username already in use',
        },
        { status: 400 },
      );
    }

    if (body.email !== 'free@mail.com') {
      return HttpResponse.json(
        {
          error: 'Email already in use',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        message: 'User created',
      },
      { status: 200 },
    );
  }),
];
