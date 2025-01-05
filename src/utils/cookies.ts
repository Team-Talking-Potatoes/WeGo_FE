'use server';

import { cookies } from 'next/headers';

/**
 * 서버에서 `accessToken` 쿠키를 가져오는 헬퍼 함수
 * @returns string - accessToken 값
 */
export const getAccessTokenFromCookies = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value || '';
};
