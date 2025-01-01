import { http } from '../fetcher';

export interface UserInfo {
  userId: number;
  nickname: string;
  email: string;
  description: string;
  profileImage: string;
}

export const getUserInfo = () => {
  return http.get<UserInfo>('/users');
};
