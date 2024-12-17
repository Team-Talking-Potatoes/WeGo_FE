import { http, HttpResponse } from 'msw';
import travelList from '@/mocks/data/travel/travelList.json';

export const popularTravel = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/travels/popular`,
  async () => {
    return HttpResponse.json(travelList);
  },
);
