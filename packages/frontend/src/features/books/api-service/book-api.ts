import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../../app/store';

const BASE_URL = `http://localhost:3000/api/books`;

type BookDetails = {
  title: string;
  author: string;
  chapters: number;
  pages?: number;
};

export const bookAPI = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // inject auth header into every book request
    // second argument allows me to access my redux store to get the token
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.login.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
    },
  }),
  endpoints: builder => ({
    addBook: builder.mutation({
      query: (bookDetails: BookDetails) => ({
        url: '/create',
        method: 'POST',
        body: bookDetails,
      }),
    }),
  }),
});

export const { useAddBookMutation } = bookAPI;
