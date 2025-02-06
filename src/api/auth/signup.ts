import { AuthInput } from '@/@types/auth';
import { BaseResponse } from '@/@types/api';
import { http } from '../fetcher';

type SignupRequestBody = Pick<
  AuthInput,
  'email' | 'password' | 'name' | 'nickname' | 'birthDate' | 'contact'
>;

export const signup = (credentials: SignupRequestBody) => {
  return http.post<BaseResponse<object>>('/auth/sign-up', credentials);
};
