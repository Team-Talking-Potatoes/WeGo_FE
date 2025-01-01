import { Review } from '@/@types/review';
import { http } from '../fetcher';

export const getPopularReview = () => {
  return http.get<Review[]>('/reviews/popular');
};

export const getTravelReview = (id: number) => {
  return http.get<Review[]>(`/reviews?id=${id}`);
};
