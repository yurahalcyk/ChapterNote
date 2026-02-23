import { toast } from 'react-toastify';

const toasts = {
  login: {
    successfulLogin: (username: string) => {
      toast(`Login successful. Welcome ${username}!`, {
        type: 'success',
      });
    },
    failedLogin: (errorMsg: string) => {
      toast(`${errorMsg}`, {
        type: 'error',
      });
    },
  },
  register: {
    successfulRegister: () => {
      toast('Registration successful! Please login', {
        type: 'success',
      });
    },
    failedRegister: (errorMsg: string) => {
      toast(`${errorMsg}`, {
        type: 'error',
      });
    },
  },
  books: {
    successfulAddBook: (bookTitle: string) => {
      toast(`Added ${bookTitle} to your library!`, { type: 'success' });
    },
    failedAddBook: (errorMsg: string) => {
      toast(`Failed to add your book. Error: ${errorMsg}`, { type: 'error' });
    },
  },
  logout: {
    logout: () => toast('Hope to see you again soon!', { type: 'info' }),
  },
};

export default toasts;
