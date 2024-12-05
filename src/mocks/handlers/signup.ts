import { http, HttpResponse, PathParams } from 'msw';
import {
  FAKE_EMAIL_CODE,
  FAKE_USER_EMAIL,
  FAKE_VERIFIED_TOKEN,
} from '@/mocks/data/auth';

interface MailSendRequestBody {
  email: string;
}

interface SignupRequestBody {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthDate: string;
  contact: string;
}

const signup = [
  /* -------------------------------- 인증 이메일 전송 ------------------------------- */
  http.post<MailSendRequestBody, PathParams>(
    '/api/auth/mail-send',
    async ({ request }) => {
      const { email } = await request.json();

      // 이메일 중복 체크 실패
      if (email === FAKE_USER_EMAIL) {
        return HttpResponse.json(
          { message: 'Email already exists' },
          { status: 400 },
        );
      }

      // 이메일 중복 체크 성공
      return HttpResponse.json(
        {
          message: 'Email sent',
          token: 'msw-token',
        },
        { status: 200 },
      );
    },
  ),

  /* ------------------------------- 이메일 인증코드 확인 ------------------------------ */
  http.post<PathParams>(
    `/api/auth/mail-check?emailCode=${FAKE_EMAIL_CODE}`,
    async ({ request }) => {
      const url = new URL(request.url);
      const emailCode = url.searchParams.get('emailCode');

      // 이메일 인증코드 확인 실패
      if (emailCode !== FAKE_EMAIL_CODE.toString()) {
        return HttpResponse.json(
          { message: 'Invalid email code' },
          { status: 400 },
        );
      }

      // 이메일 인증코드 확인 성공
      return HttpResponse.json(
        {
          message: 'Email code verified',
          verifiedToken: FAKE_VERIFIED_TOKEN,
        },
        { status: 200 },
      );
    },
  ),

  /* -------------------------------- 회원 가입 요청 -------------------------------- */
  http.post<SignupRequestBody, PathParams>(
    `/api/auth/sign-up?verifiedToken=${FAKE_VERIFIED_TOKEN}`,
    async ({ request }) => {
      const { email, password, name, nickname, birthDate, contact } =
        await request.json();

      // 회원 가입 실패
      if (email === FAKE_USER_EMAIL) {
        return HttpResponse.json(
          {
            message: 'Email already exists',
          },
          { status: 400 },
        );
      }

      // 회원 가입 성공
      return HttpResponse.json(
        {
          message: 'Sign up successful',
          signupForm: {
            email,
            password,
            name,
            nickname,
            birthDate,
            contact,
            verifiedToken: FAKE_VERIFIED_TOKEN,
          },
        },
        {
          status: 200,
          headers: {
            'Set-Cookie': 'access-token=msw-access, refresh-token=msw-refresh',
          },
        },
      );
    },
  ),
];

export default signup;
