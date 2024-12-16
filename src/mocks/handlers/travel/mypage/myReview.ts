import { HttpResponse, http } from 'msw';
import myReviewListMock from '@/mocks/data/review/mypage/myReviewListMock.json';

export const myReview = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/published`,
  async ({ request }) => {
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
  },
);
