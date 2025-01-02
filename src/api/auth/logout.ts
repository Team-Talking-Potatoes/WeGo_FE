import { http } from '../fetcher';

export const logout = () => {
  return http.post<any>('/auth/sign-out');
};
