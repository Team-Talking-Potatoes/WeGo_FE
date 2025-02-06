import { BaseResponse } from '@/@types/api';
import { http } from '../fetcher';

export const logout = () => {
  return http.post<BaseResponse<object>>('/auth/sign-out');
};
