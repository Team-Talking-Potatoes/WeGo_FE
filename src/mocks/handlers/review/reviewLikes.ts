import { http, HttpResponse } from 'msw';

export const reviewLikes = [
  http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/:id/likes`,
    async ({ cookies }) => {
      const token = cookies.accessToken;

      if (!token) {
        return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      return HttpResponse.json({ message: 'success' });
    },
  ),

  http.delete(
    `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/:id/likes`,
    async ({ cookies }) => {
      const token = cookies.accessToken;

      if (!token) {
        return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      return HttpResponse.json({ message: 'success' });
    },
  ),
];
