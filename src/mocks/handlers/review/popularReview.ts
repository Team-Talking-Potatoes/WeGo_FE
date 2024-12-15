import { http, HttpResponse } from 'msw';
import reviewListMock from '@/mocks/data/review/reviewListMock.json';

const popularReview = [
  http.get('/api/review/popular', async () => {
    return HttpResponse.json(reviewListMock);
  }),
];

export default popularReview;
