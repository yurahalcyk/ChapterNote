import { userLoginDTO, UserRegistrationDTO } from '../../dto/user-dto.ts';

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

export const RegistrationRequest: UserRegistrationDTO = {
  username: 'test123',
  email: 'testemail@mail.com',
  password: 'testpw123',
};

export const loginRequest: userLoginDTO = {
  username: 'test1',
  password: 'pw123',
};
