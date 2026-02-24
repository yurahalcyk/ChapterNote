import { http, HttpResponse } from 'msw';
import { LOGIN_URL, REGISTER_URL } from './types/handler-routes';

// handler structure: use handlers to describe successful states of the network. Use runtime overrides for failures.
// To do that, use server.use() in the individual test to prepend the request handler with the appropriate handler.
export const handlers = [
  // LOGIN
  http.post(`${LOGIN_URL}`, async () => {
    return HttpResponse.json(
      {
        message: 'Login successful',
        token: 'fake token',
      },
      { status: 200 },
    );
  }),

  // REGISTER
  http.post(`${REGISTER_URL}`, () => {
    return HttpResponse.json(
      {
        message: 'User created',
      },
      { status: 200 },
    );
  }),
];
