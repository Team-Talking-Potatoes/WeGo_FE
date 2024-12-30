import { http, HttpResponse } from 'msw';
import userInfo from '@/mocks/data/user/userInfo.json';

export const getUserInfo = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
  async ({ cookies }) => {
    const token = cookies.accessToken;
    if (!token) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return HttpResponse.json(userInfo, { status: 200 });
  },
);
