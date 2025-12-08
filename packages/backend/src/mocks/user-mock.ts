import {
  userLoginDataObject,
  UserRegistrationDataObject,
} from '../types/user-types.ts';

interface RegisteredUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

export const validCreatedUser: RegisteredUser = {
  id: 1,
  username: 'test123',
  email: 'testemail@mail.com',
  password: 'testpw123',
};

export const RegistrationRequest: UserRegistrationDataObject = {
  username: 'test123',
  email: 'testemail@mail.com',
  password: 'testpw123',
};

export const loginRequest: userLoginDataObject = {
  username: 'test1',
  password: 'pw123',
};
