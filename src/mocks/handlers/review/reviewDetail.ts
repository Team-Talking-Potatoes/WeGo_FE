import { http, HttpResponse } from 'msw';
import reviewDetailMock from '@/mocks/data/review/reviewDetailMock.json';

export const reviewDetail = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/:id`,
  async () => {
    return HttpResponse.json(reviewDetailMock);
  },
);
