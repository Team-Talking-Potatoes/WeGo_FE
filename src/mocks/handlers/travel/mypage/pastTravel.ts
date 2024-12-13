import { HttpResponse, http } from 'msw';
import pastTravelListMock from '@/mocks/data/travel/mypage/pastTravelListMock.json';

const pastTravel = http.get('/api/travels/finished', async ({ request }) => {
  const url = new URL(request.url);
  const limit = url.searchParams.get('limit');
  const offset = url.searchParams.get('offset');

  const startIndex = Number(offset) * Number(limit);
  const endIndex = startIndex + Number(limit);
  const past = pastTravelListMock.travels.slice(startIndex, endIndex);

  return HttpResponse.json({
    total: pastTravelListMock.total,
    travels: past,
  });
});

export default pastTravel;
