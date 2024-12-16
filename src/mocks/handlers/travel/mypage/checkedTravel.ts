import { HttpResponse, http } from 'msw';
import checkedTravelListMock from '@/mocks/data/travel/mypage/checkedTravelListMock.json';

export const checkedTravel = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/travels/checked`,
  async ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');

    const startIndex = Number(offset) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const checked = checkedTravelListMock.travels.slice(startIndex, endIndex);

    return HttpResponse.json({
      total: checkedTravelListMock.total,
      travels: checked,
    });
  },
);
