import { createListenerMiddleware } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/api-service/auth';
import toasts from '../toasts/toasts';
import { navigateTo } from './utils/redirection-util/navigation-slice';
import { extractApiError } from './utils/api-response-util';
import { addTokenToLocalStorage } from '../features/auth/login/slices/login-slice';

export const toastAndRedirectListeners = createListenerMiddleware();

// login successful
toastAndRedirectListeners.startListening({
  matcher: authApi.endpoints.loginUser.matchFulfilled,
  effect: async (action, listenerApi) => {
    toasts.login.successfulLogin(action.meta.arg.originalArgs.username);
    listenerApi.dispatch(navigateTo('/dashboard'));
    listenerApi.dispatch(
      addTokenToLocalStorage(action.payload.token as string),
    );
  },
});

// login failure
toastAndRedirectListeners.startListening({
  matcher: authApi.endpoints.loginUser.matchRejected,
  effect: async action => {
    const error = action.payload!;
    toasts.login.failedLogin(extractApiError(error));
  },
});

// register successful
toastAndRedirectListeners.startListening({
  matcher: authApi.endpoints.registerUser.matchFulfilled,
  effect: async (action, listenerApi) => {
    toasts.register.successfulRegister();
    listenerApi.dispatch(navigateTo('/login'));
  },
});

// register failure
toastAndRedirectListeners.startListening({
  matcher: authApi.endpoints.registerUser.matchRejected,
  effect: async action => {
    const error = action.payload;
    toasts.register.failedRegister(extractApiError(error));
  },
});
