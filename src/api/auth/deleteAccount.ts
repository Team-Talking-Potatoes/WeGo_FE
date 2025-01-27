import { AuthInput } from '@/@types/auth';
import { BaseResponse } from '@/@types/api';
import { http } from '../fetcher';

type PasswordRequestBody = Pick<AuthInput, 'password'>;

interface CheckPasswordToken {
  deleteUserToken: string;
}

export const checkPassword = (password: PasswordRequestBody) => {
  return http.post<BaseResponse<object>>('/users/check/password', password);
};

export const deleteAccount = () => {
  return http.delete<BaseResponse<CheckPasswordToken>>('/users');
};
