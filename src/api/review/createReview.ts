import { Travel } from '@/@types/travel';
import { http } from '../fetcher';

interface WritableTravelResponse {
  content: Travel[];
  total: number;
  currentPage: number;
  hasNext: boolean;
}

export const getWritableTravelReview = (size: number, page: number) => {
  return http.get<WritableTravelResponse>(
    `/travels/reviews/pending?limit=${size}&page=${page}`,
  );
};

export const createReview = (formData: FormData) => {
  return http.post<any>('/reviews', formData);
};
