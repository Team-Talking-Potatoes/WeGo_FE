import { http, HttpResponse } from 'msw';
import userList from '@/mocks/data/user/userList.json';

export const popularUser = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/users/popular`,
  async () => {
    return HttpResponse.json(userList);
  },
);
