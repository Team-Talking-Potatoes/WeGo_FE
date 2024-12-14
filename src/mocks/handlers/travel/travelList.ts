import { http, HttpResponse } from 'msw';
import travel from '@/mocks/data/travel/travelList.json';

const travelList = [
  http.get('/api/travels', async () => {
    return HttpResponse.json(travel);
  }),
];

export default travelList;
