import { http } from '../fetcher';

export const editProfile = (formData: FormData) => {
  return http.put<any>('/users', formData);
};
