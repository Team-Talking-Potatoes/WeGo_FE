import { Review } from '@/@types/review';
import { ApiResponse } from '@/@types/api';
import { http } from '../fetcher';

export const getPopularReview = () => {
  return http.get<ApiResponse<Review[]>>('/reviews/popular');
};

export const getTravelReview = (id: number) => {
  return http.get<ApiResponse<Review[]>>(`/reviews?id=${id}`);
};
