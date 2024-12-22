import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const setPathnameHeader = (request: NextRequest, response: NextResponse) => {
  response.headers.set('x-pathname', request.nextUrl.pathname);

  return response;
};

export const middleware = (request: NextRequest) => {
  const response = NextResponse.next();

  // 서버 컴포넌트에서 pathname을 가져오기 위해 헤더에 설정
  setPathnameHeader(request, response);

  return response;
};
