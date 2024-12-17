import { http, HttpResponse } from 'msw';
import travel from '@/mocks/data/travel/travelList.json';

export const travelList = http.get(
  // msw 정상화 이후 에러로 인한 엔드포인트 임시 변경
  `${process.env.NEXT_PUBLIC_BASE_URL}/travels/exceptiton`,
  async () => {
    return HttpResponse.json(travel);
  },
);
