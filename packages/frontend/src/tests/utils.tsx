import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { store } from '../app/store';
import { ToastContainer } from 'react-toastify';

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
