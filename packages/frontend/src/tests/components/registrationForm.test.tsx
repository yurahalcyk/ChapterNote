import { describe, expect, it } from '@jest/globals';
import { RegisterForm } from '../../features/auth/registration/components/register-form';
import { renderComponentWithProviderAndToast, setupUser } from '../utils';
import { screen, waitFor } from '@testing-library/dom';
import { server } from '../mocks/node';
import { http, HttpResponse } from 'msw';
import { REGISTER_URL } from '../mocks/handlers/routes/handler-routes';

// Asserting toasts and navigation intent
const username: string = 'test1';
const email: string = 'test@email.com';
const password: string = '123';

describe('Registration From Component', () => {
  it('username taken toast shows when taken username entered', async () => {
    const user = setupUser();
    server.use(
      http.post(`${REGISTER_URL}`, () => {
        return HttpResponse.json(
          {
            error: 'Username already in use',
            name: 'ValidationError',
          },
          { status: 400 },
        );
      }),
    );

    renderComponentWithProviderAndToast(<RegisterForm />, ['/register']);

    await user.type(screen.getByTestId('username-input'), username);
    await user.type(screen.getByTestId('email-input'), email);
    await user.type(screen.getByTestId('password-input'), password);

    await user.click(screen.getByTestId('register-btn'));

    await waitFor(() => {
      expect(screen.getByText(/username already in use/i)).toBeInTheDocument();
    });
  });

  it('email taken toast shows when taken email entered', async () => {
    const user = setupUser();

    server.use(
      http.post(`${REGISTER_URL}`, () => {
        return HttpResponse.json(
          {
            error: 'Email already in use',
            name: 'ValidationError',
          },
          { status: 400 },
        );
      }),
    );
    renderComponentWithProviderAndToast(<RegisterForm />, ['/register']);

    await user.type(screen.getByTestId('username-input'), username);
    await user.type(screen.getByTestId('email-input'), email);
    await user.type(screen.getByTestId('password-input'), password);

    await user.click(screen.getByTestId('register-btn'));

    await waitFor(() => {
      expect(screen.getByText(/email already in use/i)).toBeInTheDocument();
    });
  });

  it('successful registration toast and redirect upon successful registration', async () => {
    const user = setupUser();

    const { store } = renderComponentWithProviderAndToast(<RegisterForm />, [
      '/register',
    ]);

    await user.type(screen.getByTestId('username-input'), username);
    await user.type(screen.getByTestId('email-input'), email);
    await user.type(screen.getByTestId('password-input'), password);

    await user.click(screen.getByTestId('register-btn'));

    await waitFor(() => {
      expect(
        screen.getByText(/registration successful! please login/i),
      ).toBeInTheDocument();
    });

    const state = store.getState();
    expect(state.navigation.path).toBe('/login');
  });
});
