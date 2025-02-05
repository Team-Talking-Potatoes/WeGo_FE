import { Review, ReviewListFilters, ReviewScore } from '@/@types/review';
import { BaseResponse, ListResponse } from '@/@types/api';
import { http } from '../fetcher';

export const getPopularReview = () => {
  return http.get<BaseResponse<Review[]>>('/reviews/popular');
};

export const getTravelReviewRate = ({ travelId }: { travelId: number }) => {
  return http.get<BaseResponse<ReviewScore>>(`/travels/${travelId}/ratings`);
};

export const getTravelReview = ({
  travelId,
  pageParam,
}: {
  travelId: number;
  pageParam: number;
}) => {
  return http.get<ListResponse<Review>>(
    `/reviews?travelId=${travelId}&page=${pageParam}&size=8`,
  );
};

export const getReview = ({
  pageParam,
  sortOrder,
}: {
  pageParam: number;
  sortOrder: ReviewListFilters['sortOrder'];
}) => {
  return http.get<ListResponse<Review>>(
    `/reviews?page=${pageParam}&sortByType=${sortOrder}&size=12`,
  );
};

export const getMyReview = (limit: number, offset: number) => {
  return http.get<ListResponse<Review>>(
    `/reviews/mine?size=${limit}&page=${offset}`,
  );
};

export const getReviewDetail = (reviewId: number) => {
  return http.get<BaseResponse<Review>>(`/reviews/${reviewId}`);
};

export const postReviewLike = (reviewId: number) => {
  return http.post<BaseResponse<unknown>>(`/reviews/${reviewId}/likes`);
};

export const deleteReviewLike = (reviewId: number) => {
  return http.delete<BaseResponse<unknown>>(`/reviews/${reviewId}/likes`);
};
