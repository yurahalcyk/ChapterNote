import { createListenerMiddleware } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/api-service/auth';
import toasts from '../toasts/toasts';
import { navigateTo } from './utils/redirection-util/navigation-slice';
import { extractApiError } from './utils/api-response-util';

export const toastAndRedirectListeners = createListenerMiddleware();

// login successful
toastAndRedirectListeners.startListening({
  matcher: authApi.endpoints.loginUser.matchFulfilled,
  effect: async (action, listenerApi) => {
    toasts.login.successfulLogin(action.meta.arg.originalArgs.username);
    listenerApi.dispatch(navigateTo('/dashboard'));
  },
});

// login failure
toastAndRedirectListeners.startListening({
  matcher: authApi.endpoints.loginUser.matchRejected,
  effect: async action => {
    const error = action.payload!;
    console.log(error);
    toasts.login.failedLogin(extractApiError(error));
  },
});
