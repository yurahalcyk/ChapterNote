import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginState {
  token: string | null;
}

const initialState = {
  token: localStorage.getItem('token') || null,
} satisfies LoginState as LoginState;

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    addTokenToLocalStorage(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem('token', state.token);
    },
    removeTokenFromLocalStorage(state) {
      state.token = null;
    },
  },
});

export const { addTokenToLocalStorage, removeTokenFromLocalStorage } =
  loginSlice.actions;
export const loginReducer = loginSlice.reducer;
