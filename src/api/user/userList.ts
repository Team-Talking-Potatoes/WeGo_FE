import { PopularUser } from '@/@types/user';
import { BaseResponse } from '@/@types/api';
import { http } from '../fetcher';

export const getPopularUser = () => {
  return http.get<BaseResponse<PopularUser[]>>('/users/popular');
};
