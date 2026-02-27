import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { store } from '../app/store';
import { ToastContainer } from 'react-toastify';
import userEvent, { UserEvent } from '@testing-library/user-event';

export const renderComponentWithProviderAndToast = (
  ui: React.ReactElement,
  initialEntries: string[],
): RenderResult & { store: typeof store } => {
  const renderFn = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        {ui}
        <ToastContainer />
      </MemoryRouter>
    </Provider>,
  );

  return {
    store,
    ...renderFn,
  };
};

export const setupUser = (): UserEvent => {
  const user = userEvent.setup();
  return user;
};
