import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NavState {
  path: string | null;
}

const initialState: NavState = {
  path: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigateTo: (state, action: PayloadAction<string>) => {
      state.path = action.payload;
    },
    clearNavigation: state => {
      state.path = null;
    },
  },
});

export const { navigateTo, clearNavigation } = navigationSlice.actions;
export const navigationReducer = navigationSlice.reducer;
