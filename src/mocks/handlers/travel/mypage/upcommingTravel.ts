import { HttpResponse, http } from 'msw';
import upcommingListMock from '@/mocks/data/travel/mypage/upcommingListMock.json';

const upcommingTravel = http.get(
  '/api/travels/scheduled',
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

export default upcommingTravel;
