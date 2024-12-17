import { http, HttpResponse } from 'msw';
import reviewList from '@/mocks/data/review/travelReviewList.json';

export const travelDetailReview = [
  http.get(`${process.env.NEXT_PUBLIC_BASE_URL}/review`, async () => {
    return HttpResponse.json(reviewList);
  }),
];
