import { http } from '../fetcher';

export const verifyToken = () => {
  return http.get<any>('/auth/token/verify');
};
