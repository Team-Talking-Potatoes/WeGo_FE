import { MyPageProfile } from '@/@types/user';
import { http } from '../fetcher';

export interface UserInfoResponse {
  status: string;
  data: MyPageProfile;
}

export const getUserInfo = () => {
  return http.get<UserInfoResponse>('/users');
};
