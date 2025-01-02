import { Travel } from '@/@types/travel';
import { http } from '../fetcher';

interface WritableTravelResponse {
  status: string;
  content: Travel[];
  total: number;
  currentPage: number;
  hasNext: boolean;
}

export const getWritableTravelReview = (size: number, page: number) => {
  return http.get<WritableTravelResponse>(
    `/travels/reviews/pending?size=${size}&page=${page}`,
  );
};

export const createReview = (formData: FormData) => {
  return http.post<any>('/reviews', formData);
};
