import { Review, ReviewDetailResponse, ReviewResponse } from '@/@types/review';
import { http } from '../fetcher';

interface ReviewParams {
  pageParam: number;
  sortOrder: string;
}

interface MyReview {
  total: number;
  reviews: Review[];
}
/* ---------------------------------- 임시 수정 --------------------------------- */
interface ReviewPopularResponse {
  status: string;
  data: Review[];
}

export const getPopularReview = () => {
  return http.get<ReviewPopularResponse>('/reviews/popular');
};
/* ---------------------------------- 임시 수정 --------------------------------- */
export const getTravelReview = (id: number) => {
  return http.get<Review[]>(`/reviews?id=${id}`);
};

export const getReview = ({ pageParam, sortOrder }: ReviewParams) => {
  return http.get<ReviewResponse>(
    `/reviews?page=${pageParam}&sortBy=${sortOrder}&limit=12`,
  );
};

export const getMyReview = (limit: number, offset: number) => {
  return http.get<MyReview>(
    `/reviews/published?limit=${limit}&offset=${offset}`,
  );
};

export const getReviewDetail = (id: number) => {
  return http.get<ReviewDetailResponse>(`/reviews/${id}`);
};

export const postReviewLike = (id: number) => {
  return http.post<unknown>(`/reviews/${id}/likes`);
};

export const deleteReviewLike = (id: number) => {
  return http.delete<unknown>(`/reviews/${id}/likes`);
};
