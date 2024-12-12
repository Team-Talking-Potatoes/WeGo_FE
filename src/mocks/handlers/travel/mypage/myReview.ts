import { HttpResponse, http } from 'msw';
import myReviewListMock from '@/mocks/data/review/mypage/myReviewListMock.json';

const myReview = http.get('/api/reviews/published', async ({ request }) => {
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit');
  const offset = url.searchParams.get('offset');

  const startIndex = Number(offset) * Number(limit);
  const endIndex = startIndex + Number(limit);
  const myReviewList = myReviewListMock.reviews.slice(startIndex, endIndex);

  return HttpResponse.json({
    total: myReviewListMock.total,
    reviews: myReviewList,
  });
});

export default myReview;
