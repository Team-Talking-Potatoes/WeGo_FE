import { Review, ReviewDetailResponse, ReviewResponse } from '@/@types/review';
import { BaseResponse } from '@/@types/api';
import { TravelReviewRateScore } from '@/@types/travel';
import { http } from '../fetcher';

interface ReviewParams {
  pageParam: number;
  sortOrder: string;
}

interface TravelReviewParams {
  travelId: number;
  pageParam: number;
}

interface MyReview {
  content: Review[];
  total: number;
  currentPage: number;
  hasNext: boolean;
}

interface MyReviewResponse {
  status: string;
  data: MyReview;
}

interface TravelReview {
  content: Review[];
  total: number;
  hasNext: boolean;
  currentPage: number;
}
interface TravelReviewRate {
  reviews: TravelReviewRateScore;
  totalRating: number;
}

export const getPopularReview = () => {
  return http.get<BaseResponse<Review[]>>('/reviews/popular');
};

export const getTravelReview = ({
  travelId,
  pageParam,
}: TravelReviewParams) => {
  return http.get<BaseResponse<TravelReview>>(
    `/reviews?id=${travelId}&page=${pageParam}`,
  );
};

export const getTravelReviewRate = ({ travelId }: { travelId: number }) => {
  return http.get<BaseResponse<TravelReviewRate>>(
    `/reviews/${travelId}/ratings`,
  );
};

export const getReview = ({ pageParam, sortOrder }: ReviewParams) => {
  return http.get<BaseResponse<ReviewResponse>>(
    `/reviews?page=${pageParam}&sortBy=${sortOrder}&size=12`,
  );
};

export const getMyReview = (limit: number, offset: number) => {
  return http.get<MyReviewResponse>(
    `/reviews/published?size=${limit}&page=${offset}`,
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
