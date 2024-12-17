import { APIError } from '@/@types/api';
import { TextInput } from '@/@types/auth';

type SendMailRequestBody = Pick<TextInput, 'email'>;
type CheckCodeRequestBody = Pick<TextInput, 'email' | 'emailCode'>;

/* -------------------------------- 인증 이메일 전송 (회원가입)------------------------------- */

export const sendMail = async (credentials: SendMailRequestBody) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-up/emails`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    },
  );

  if (!response.ok) {
    const error = new Error('Send Mail failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};

/* -------------------------------- 인증 이메일 전송 (비밀번호 재설정)------------------------------- */

export const passwordSendMail = async (credentials: SendMailRequestBody) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/password/emails`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    },
  );

  if (!response.ok) {
    const error = new Error('Send Mail failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};

/* ------------------------------- 이메일 인증코드 확인 ------------------------------ */

export const checkCode = async ({ email, emailCode }: CheckCodeRequestBody) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/emails/verify?verifyNumber=${emailCode}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    },
  );

  if (!response.ok) {
    const error = new Error('Check Mail failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};
