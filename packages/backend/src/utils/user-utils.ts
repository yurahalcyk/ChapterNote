import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const utils = {
  hashPassword: async (password: string): Promise<string> => {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return hash;
  },

  verifyPassword: async (password: string, hash: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  },
};

export default utils;
