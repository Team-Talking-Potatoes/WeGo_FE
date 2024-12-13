import { HttpResponse, http } from 'msw';
import writableTravelListMock from '@/mocks/data/travel/mypage/writableTravelListMock.json';

const writableTravel = http.get(
  '/api/travels/reviews/pending',
  async ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');

    const startIndex = Number(offset) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const writable = writableTravelListMock.travels.slice(startIndex, endIndex);

    return HttpResponse.json({
      total: writableTravelListMock.total,
      travels: writable,
    });
  },
);

export default writableTravel;
