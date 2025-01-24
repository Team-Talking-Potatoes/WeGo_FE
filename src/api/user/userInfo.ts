import { BaseResponse } from '@/@types/api';
import { User } from '@/@types/user';
import { http } from '../fetcher';

export const getUserInfo = () => {
  return http.get<BaseResponse<User>>('/users');
};
