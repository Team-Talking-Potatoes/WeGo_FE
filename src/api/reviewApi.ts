import { Review, ReviewDetailResponse, ReviewResponse } from '@/@types/review';
import { ApiResponse } from '@/@types/api';
import { http } from './fetcher';

interface ReviewParams {
  pageParam: number;
  sortOrder: string;
}

interface MyReview {
  total: number;
  reviews: Review[];
}

export const getReview = ({ pageParam, sortOrder }: ReviewParams) => {
  return http.get<ApiResponse<ReviewResponse>>(
    `/reviews?page=${pageParam}&sortBy=${sortOrder}&limit=12`,
  );
};

export const getMyReview = (limit: number, offset: number) => {
  return http.get<ApiResponse<MyReview>>(
    `/reviews/published?limit=${limit}&offset=${offset}`,
  );
};

export const getReviewDetail = (id: number) => {
  return http.get<ApiResponse<ReviewDetailResponse>>(`/reviews/${id}`);
};
