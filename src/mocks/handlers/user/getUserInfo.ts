import { http, HttpResponse } from 'msw';
import userInfo from '@/mocks/data/user/userInfo.json';

const getUserInfo = http.get('/api/users', async () => {
  return HttpResponse.json(userInfo, { status: 200 });
});

export default getUserInfo;
