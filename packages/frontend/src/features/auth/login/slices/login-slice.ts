import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginState {
  token: string | null;
}

const initialState = {
  token: localStorage.getItem('token') || null,
} satisfies LoginState as LoginState;

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    addTokenToLocalStorage(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem('token', state.token);
    },
  },
});

export const { addTokenToLocalStorage } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
