import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        autoClose={3000}
        position="bottom-right"
        closeOnClick
        theme="dark"
        limit={2}
      />
    </Provider>
  </StrictMode>,
);
