import { AuthInput } from '@/@types/auth';
import { BaseResponse } from '@/@types/api';
import { http } from '../fetcher';

type SendMailRequestBody = Pick<AuthInput, 'email'>;
type CheckCodeRequestBody = Pick<AuthInput, 'email' | 'verifyNumber'>;
interface EmailVerifyToken {
  emailVerifyToken: string;
}

/* -------------------------------- 인증 이메일 전송 (회원가입)------------------------------- */
export const sendMail = (credentials: SendMailRequestBody) => {
  return http.post<BaseResponse<object>>('/auth/emails/sign-up', credentials);
};

/* -------------------------------- 인증 이메일 전송 (비밀번호 재설정)------------------------------- */
export const passwordSendMail = (credentials: SendMailRequestBody) => {
  return http.post<BaseResponse<object>>('/auth/emails/password', credentials);
};

/* ------------------------------- 이메일 인증코드 확인 ------------------------------ */
export const checkCode = (credentials: CheckCodeRequestBody) => {
  return http.post<BaseResponse<EmailVerifyToken>>(
    '/auth/emails/verification',
    credentials,
  );
};
