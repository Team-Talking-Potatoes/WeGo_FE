import { AuthInput } from '@/@types/auth';
import { BaseResponse } from '@/@types/api';
import { http } from '../fetcher';

type LoginRequestBody = Pick<AuthInput, 'email' | 'password'>;

export const login = (credentials: LoginRequestBody) => {
  return http.post<BaseResponse<object>>('/auth/sign-in', credentials);
};
