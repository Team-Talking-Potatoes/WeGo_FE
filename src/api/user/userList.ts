import { UserList } from '@/@types/user';
import { ApiResponse } from '@/@types/api';
import { http } from '../fetcher';

export const getPopularUser = () => {
  return http.get<ApiResponse<UserList[]>>('/users/popular');
};
