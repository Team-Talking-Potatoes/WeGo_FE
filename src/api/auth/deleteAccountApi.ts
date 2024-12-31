import { http } from '../fetcher';

export const checkPassword = (password: { password: string }) => {
  return http.post<any>('/users/check/password', password);
};

export const deleteAccount = () => {
  return http.delete<any>('/users');
};
