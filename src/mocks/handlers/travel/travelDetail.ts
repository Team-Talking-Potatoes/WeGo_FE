import { http, HttpResponse } from 'msw';
import travel from '@/mocks/data/travel/travelDetail.json';

export const travelDetail = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/travels/detail/:id`,
  async () => {
    return HttpResponse.json(travel);
  },
);
