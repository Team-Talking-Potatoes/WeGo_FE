import { createReview } from './createReview';
import { popularReview } from './popularReview';
import { reviewList } from './reviewList';
import { travelDetailReview } from './travelDetailReview';

export const review = [
  createReview,
  ...popularReview,
  ...reviewList,
  ...travelDetailReview,
];
