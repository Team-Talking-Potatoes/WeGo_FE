import { UserList } from '@/@types/user';
import { http } from '../fetcher';

export const getPopularUser = () => {
  return http.get<UserList[]>('/users/popular');
};
