import { describe, expect, it } from '@jest/globals';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { LoginForm } from '../../features/auth/login/components/login-form';
import { renderComponentWithProviderAndToast } from '../utils';

// Asserting toasts and navigation intent

describe('Login Form Component', () => {
  it('incorrect password error toast shows when incorrect password entered', async () => {
    renderComponentWithProviderAndToast(<LoginForm />, ['/login']);

    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: 'valid-username' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'wrong-pw' },
    });
    fireEvent.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(screen.getByText(/incorrect password/i)).toBeInTheDocument();
    });
  });

  it('username not found error toast shows when unknown username entered', async () => {
    renderComponentWithProviderAndToast(<LoginForm />, ['/login']);

    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: 'invalid-username' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'pw' },
    });
    fireEvent.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(
        screen.getByText(/username: invalid-username not found/i),
      ).toBeInTheDocument();
    });
  });

  it('successful user login toast and redirect upon successful login', async () => {
    const { store } = renderComponentWithProviderAndToast(<LoginForm />, [
      '/login',
    ]);

    fireEvent.change(screen.getByTestId('username-input'), {
      target: { value: 'valid-username' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'correct-pw' },
    });
    fireEvent.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(
        screen.getByText(/Login successful. Welcome valid-username!/i),
      ).toBeInTheDocument();
    });

    const state = store.getState();
    expect(state.navigation.path).toBe('/dashboard');
  });
});
