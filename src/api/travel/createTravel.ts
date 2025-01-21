import { BaseResponse } from '@/@types/api';
import { http } from '../fetcher';

export const createTravel = async (
  formData: FormData,
): Promise<BaseResponse<object>> => {
  return http.post<BaseResponse<object>>('/travels', formData);
};
