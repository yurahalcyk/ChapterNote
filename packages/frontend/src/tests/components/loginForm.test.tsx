import { describe, expect, it } from '@jest/globals';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { LoginForm } from '../../features/auth/login/components/login-form';
import { renderComponentWithProviderAndToast } from '../utils';
import { server } from '../mocks/node';
import { http, HttpResponse } from 'msw';
import { LOGIN_URL } from '../mocks/handlers/types/handler-routes';

// Asserting toasts and navigation intent

const username: string = 'test';
const password: string = '123';

describe('Login Form Component', () => {
  it('error toast appears if invalid credentials entered', async () => {
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

    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: username },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: password },
    });
    fireEvent.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(
        screen.getByText(/invalid username or password/i),
      ).toBeInTheDocument();
    });
  });

  it('successful toast appears and expected redirect when valid credentials entered', async () => {
    const { store } = renderComponentWithProviderAndToast(<LoginForm />, [
      '/login',
    ]);

    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: username },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: password },
    });
    fireEvent.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(
        screen.getByText(`Login successful. Welcome ${username}!`),
      ).toBeInTheDocument();
    });

    const state = store.getState();
    expect(state.navigation.path).toBe('/dashboard');
  });
});
