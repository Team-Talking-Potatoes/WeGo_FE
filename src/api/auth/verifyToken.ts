import type { NextRequest } from 'next/server';
import { BaseResponse } from '@/@types/api';
import { http } from '../fetcher';

export const verifyToken = (request?: NextRequest) => {
  const config = request
    ? {
        headers: {
          Cookie: request.headers.get('cookie') || '',
        },
      }
    : undefined;

  return http.get<BaseResponse<unknown>>('/auth/token/verification', config);
};
