import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../../app/store';
import { AddBookRequest, GetBooksResponse } from '../types';

const BASE_URL = `http://localhost:3000/api/books`;

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
  tagTypes: ['Book'],
  endpoints: builder => ({
    getBooks: builder.query<GetBooksResponse, void>({
      query: () => ({ url: '/' }),
      providesTags: ['Book'],
    }),
    addBook: builder.mutation({
      query: (bookDetails: AddBookRequest) => ({
        url: '/',
        method: 'POST',
        body: bookDetails,
      }),
      invalidatesTags: ['Book'],
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation } = bookAPI;
