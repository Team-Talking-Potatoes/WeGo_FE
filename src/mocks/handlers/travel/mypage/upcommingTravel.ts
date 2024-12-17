import { HttpResponse, http } from 'msw';
import upcommingListMock from '@/mocks/data/travel/mypage/upcommingListMock.json';

export const upcommingTravel = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/travels/scheduled`,
  async ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');

    const startIndex = Number(offset) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const upcomming = upcommingListMock.travels.slice(startIndex, endIndex);

    return HttpResponse.json({
      total: upcommingListMock.total,
      travels: upcomming,
    });
  },
);
