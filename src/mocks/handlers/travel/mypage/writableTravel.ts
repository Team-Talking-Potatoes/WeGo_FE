import { HttpResponse, http } from 'msw';
import writableTravelListMock from '@/mocks/data/travel/mypage/writableTravelListMock.json';

export const writableTravel = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/travels/reviews/pending`,
  async ({ request }) => {
    const url = new URL(request.url);

    const size = url.searchParams.get('size');
    const page = url.searchParams.get('page');

    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');

    const startIndex = Number(offset) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const writable = writableTravelListMock.travels.slice(startIndex, endIndex);

    if (size) {
      return HttpResponse.json({
        total: writableTravelListMock.total,
        content: writableTravelListMock.travels.slice(0, 5),
        currentPage: page,
        hasNext: false,
      });
    }

    return HttpResponse.json({
      total: writableTravelListMock.total,
      travels: writable,
    });
  },
);
