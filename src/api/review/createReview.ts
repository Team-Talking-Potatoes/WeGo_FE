import { Travel } from '@/@types/travel';
import { ListResponse } from '@/@types/api';
import { http } from '../fetcher';

export const getWritableTravelReview = (size: number, page: number) => {
  return http.get<ListResponse<Travel>>(
    `/travels/reviews/pending?limit=${size}&page=${page}`,
  );
};

export const createReview = (formData: FormData) => {
  return http.post<any>('/reviews', formData);
};
