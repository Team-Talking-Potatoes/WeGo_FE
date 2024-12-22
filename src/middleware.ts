import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NEED_LOGIN_PATH } from './constants/auth';

const setPathnameHeader = (request: NextRequest, response: NextResponse) => {
  response.headers.set('x-pathname', request.nextUrl.pathname);

  return response;
};

const redirectToLogin = async (
  request: NextRequest,
  response: NextResponse,
) => {
  if (
    !(Object.values(NEED_LOGIN_PATH) as string[]).includes(
      request.nextUrl.pathname,
    )
  ) {
    return response;
  }

  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/token/verify`, {
      method: 'GET',
      credentials: 'include',
    });
    return response;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.redirect('http://localhost:3000/login');
    }
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
  }
};

export const middleware = (request: NextRequest) => {
  const response = NextResponse.next();

  // 서버 컴포넌트에서 pathname을 가져오기 위해 헤더에 설정
  setPathnameHeader(request, response);

  // 로그인 필요 페이지인 경우 로그인 페이지로 리다이렉트
  return redirectToLogin(request, response);
};
