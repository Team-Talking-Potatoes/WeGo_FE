import { http, HttpResponse } from 'msw';
import travelList from '@/mocks/travel/travelList.json';

const popularTravel = [
  http.get('/api/travles/popular', async () => {
    return HttpResponse.json({
      data: travelList,
    });
  }),
];

export default popularTravel;
