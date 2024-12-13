import { HttpResponse, http } from 'msw';
import checkedTravelListMock from '@/mocks/data/travel/mypage/checkedTravelListMock.json';

const checkedTravel = http.get('/api/travels/checked', async ({ request }) => {
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
});

export default checkedTravel;
