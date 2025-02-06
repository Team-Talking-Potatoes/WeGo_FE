import { BaseResponse } from '@/@types/api';
import { http } from '../fetcher';

export const editProfile = (formData: FormData) => {
  return http.put<BaseResponse<object>>('/users', formData);
};
