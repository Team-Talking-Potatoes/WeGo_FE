import { http, HttpResponse } from 'msw';
import travel from '@/mocks/data/travel/travelListInfitity.json';

const travelListInfinity = [
  http.get('/api/travels', async () => {
    return HttpResponse.json(travel);
  }),
];

export default travelListInfinity;
