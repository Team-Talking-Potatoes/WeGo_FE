import { FAKE_USER_PASSWORD } from '@/mocks/data/auth/auth';
import { http, HttpResponse, PathParams } from 'msw';

interface CheckPasswordRequestBody {
  password: string;
}

const checkPassword = http.post<CheckPasswordRequestBody, PathParams>(
  '/api/users/check/password',
  async ({ request }) => {
    const { password } = await request.json();

    if (password !== FAKE_USER_PASSWORD) {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    return HttpResponse.json({ message: 'Password checked' }, { status: 200 });
  },
);

export default checkPassword;
