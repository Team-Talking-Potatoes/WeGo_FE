import { http, HttpResponse, PathParams } from 'msw';

export const logout = http.post<PathParams>(
  `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-out`,
  async () => {
    return HttpResponse.json(
      { message: 'Logout successful' },
      {
        status: 200,
        headers: {
          'Set-Cookie': 'accessToken=; Max-Age=0; Secure; SameSite=None',
        },
      },
    );
  },
);
