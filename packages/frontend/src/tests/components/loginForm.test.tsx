import { describe, expect, it } from '@jest/globals';
import { screen, waitFor } from '@testing-library/react';
import { LoginForm } from '../../features/auth/login/components/login-form';
import { renderComponentWithProviderAndToast, setupUser } from '../utils';
import { server } from '../mocks/node';
import { http, HttpResponse } from 'msw';
import { LOGIN_URL } from '../mocks/handlers/routes/handler-routes';

// Asserting toasts and navigation intent

const username: string = 'test';
const password: string = '123';

describe('Login Form Component', () => {
  it('error toast appears if invalid credentials entered', async () => {
    const user = setupUser();
    server.use(
      http.post(`${LOGIN_URL}`, async () => {
        return HttpResponse.json(
          {
            error: 'Invalid username or password',
            name: 'ValidationError',
          },
          { status: 400 },
        );
      }),
    );
    renderComponentWithProviderAndToast(<LoginForm />, ['/login']);

    await user.type(screen.getByTestId('username-input'), username);
    await user.type(screen.getByTestId('password-input'), password);
    await user.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(
        screen.getByText(/invalid username or password/i),
      ).toBeInTheDocument();
    });
  });

  it('successful toast appears and expected redirect when valid credentials entered', async () => {
    const user = setupUser();

    const { store } = renderComponentWithProviderAndToast(<LoginForm />, [
      '/login',
    ]);

    await user.type(screen.getByTestId('username-input'), username);
    await user.type(screen.getByTestId('password-input'), password);
    await user.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(
        screen.getByText(`Login successful. Welcome ${username}!`),
      ).toBeInTheDocument();
    });

    const state = store.getState();
    expect(state.navigation.path).toBe('/dashboard');
  });
});
