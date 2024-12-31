import { User } from '@/@types/user';
import { http } from '../fetcher';

type LoginRequestBody = Pick<User, 'email' | 'password'>;

export const login = (credentials: LoginRequestBody) => {
  return http.post<any>('/auth/sign-in', credentials);
};
