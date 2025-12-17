import { describe, expect, it } from '@jest/globals';
import { RegisterForm } from '../../features/auth/registration/components/register-form';
import { renderComponentWithProviderAndToast } from '../utils';
import { fireEvent, screen, waitFor } from '@testing-library/dom';

// Asserting toasts and navigation intent

describe('Registration From Component', () => {
  it('username taken toast shows when taken username entered', async () => {
    renderComponentWithProviderAndToast(<RegisterForm />, ['/register']);

    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: 'taken-username' },
    });

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'free@mail.com' },
    });

    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'valid-pw' },
    });

    fireEvent.click(screen.getByTestId('register-btn'));

    await waitFor(() => {
      expect(screen.getByText(/username already in use/i)).toBeInTheDocument();
    });
  });

  it('email taken toast shows when taken email entered', async () => {
    renderComponentWithProviderAndToast(<RegisterForm />, ['/register']);

    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: 'free-username' },
    });

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'not-free@mail.com' },
    });

    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'valid-pw' },
    });

    fireEvent.click(screen.getByTestId('register-btn'));

    await waitFor(() => {
      expect(screen.getByText(/email already in use/i)).toBeInTheDocument();
    });
  });

  it('successful registration toast and redirect upon successful registration', async () => {
    const { store } = renderComponentWithProviderAndToast(<RegisterForm />, [
      '/register',
    ]);

    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: 'free-username' },
    });

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'free@mail.com' },
    });

    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'valid-pw' },
    });

    fireEvent.click(screen.getByTestId('register-btn'));

    await waitFor(() => {
      expect(
        screen.getByText(/registration successful! please login/i),
      ).toBeInTheDocument();
    });

    const state = store.getState();
    expect(state.navigation.path).toBe('/login');
  });
});
