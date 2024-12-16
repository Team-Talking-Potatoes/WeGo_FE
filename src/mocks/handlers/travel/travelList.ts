import { http, HttpResponse } from 'msw';
import travel from '@/mocks/data/travel/travelList.json';

export const travelList = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/travels`,
  async () => {
    return HttpResponse.json(travel);
  },
);
