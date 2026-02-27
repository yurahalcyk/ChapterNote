import { http, HttpResponse } from 'msw';
import { ADD_BOOK_URL } from './routes/handler-routes';

export const handlers = [
  http.post(`${ADD_BOOK_URL}`, async () => {
    return HttpResponse.json(
      {
        message: 'Book created successfully',
      },
      {
        status: 200,
      },
    );
  }),
];
