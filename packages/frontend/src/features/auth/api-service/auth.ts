import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// placing login and register in one createApi slice since they share the same backend domain e.g. api/user/...
// this is recommended in RTK query

const BASE_URL = `http://localhost:3000/api/users`;
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message?: string;
  error?: string;
  token?: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    registerUser: builder.mutation({
      query: credentials => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
