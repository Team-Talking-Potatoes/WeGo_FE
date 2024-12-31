import { createReview } from './createReview';
import { popularReview } from './popularReview';
import { reviewList } from './reviewList';
import { reviewDetail } from './reviewDetail';

export const review = [
  createReview,
  ...popularReview,
  reviewList,
  reviewDetail,
];
