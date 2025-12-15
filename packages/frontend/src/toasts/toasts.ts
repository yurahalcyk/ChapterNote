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
};

export default toasts;
