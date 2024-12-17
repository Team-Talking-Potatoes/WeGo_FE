import { http, HttpResponse } from 'msw';
import userInfo from '@/mocks/data/user/userInfo.json';

export const getUserInfo = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
  async () => {
    return HttpResponse.json(userInfo, { status: 200 });
  },
);
