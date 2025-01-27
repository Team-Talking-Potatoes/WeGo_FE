import { User } from '@/@types/user';
import { BaseResponse } from '@/@types/api';
import { http } from '../fetcher';

interface Props extends Pick<User, 'userId' | 'nickname' | 'profileImage'> {
  openTravelCount: number;
  reviewCount: number;
  hashTags: string;
}

export const getPopularUser = () => {
  return http.get<BaseResponse<Props[]>>('/users/popular');
};
