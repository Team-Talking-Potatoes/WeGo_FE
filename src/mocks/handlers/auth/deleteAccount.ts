import { FAKE_USER_PASSWORD } from '@/mocks/data/auth/auth';
import { http, HttpResponse, PathParams } from 'msw';

interface CheckPasswordRequestBody {
  password: string;
}

export const deleteAccount = [
  http.post<CheckPasswordRequestBody, PathParams>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/check/password`,
    async ({ request }) => {
      const { password } = await request.json();

      if (password !== FAKE_USER_PASSWORD) {
        return HttpResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 },
        );
      }

      return HttpResponse.json(
        { message: 'Password checked' },
        { status: 200 },
      );
    },
  ),

  http.delete<PathParams>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
    async () => {
      const response = HttpResponse.json(
        { message: 'Account deleted' },
        {
          status: 200,
          headers: {
            'Set-Cookie': 'accessToken=; Max-Age=0; Secure; SameSite=None',
          },
        },
      );

      return response;
    },
  ),
];
