import type { NextRequest } from 'next/server';
import { http } from '../fetcher';

export const verifyToken = (request?: NextRequest) => {
  const config = request
    ? {
        headers: {
          Cookie: request.headers.get('cookie') || '',
        },
      }
    : undefined;

  return http.get<{ status: number }>('/auth/token/verify', config);
};
