import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/api-service/auth';
import { navigationReducer } from '../middleware/utils/redirection-util/navigation-slice';
import { toastAndRedirectListeners } from '../middleware/toasts-and-redirects';
import { loginReducer } from '../features/auth/login/slices/login-slice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    navigation: navigationReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(toastAndRedirectListeners.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
