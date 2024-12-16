import { http, HttpResponse } from 'msw';
import reviewListMock from '@/mocks/data/review/reviewListMock.json';

export const popularReview = [
  http.get(`${process.env.NEXT_PUBLIC_BASE_URL}/review/popular`, async () => {
    return HttpResponse.json(reviewListMock);
  }),
];
