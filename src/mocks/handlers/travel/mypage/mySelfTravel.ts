import { HttpResponse, http } from 'msw';
import mySelfTravelListMock from '@/mocks/data/travel/mypage/mySelfTravelListMock.json';

const mySelfTravel = http.get('/api/travels/created', async ({ request }) => {
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit');
  const offset = url.searchParams.get('offset');

  const startIndex = Number(offset) * Number(limit);
  const endIndex = startIndex + Number(limit);
  const mySelf = mySelfTravelListMock.travels.slice(startIndex, endIndex);

  return HttpResponse.json({
    total: mySelfTravelListMock.total,
    travels: mySelf,
  });
});

export default mySelfTravel;
