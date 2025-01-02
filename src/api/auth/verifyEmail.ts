import { TextInput } from '@/@types/auth';
import { http } from '../fetcher';

type SendMailRequestBody = Pick<TextInput, 'email'>;
type CheckCodeRequestBody = Pick<TextInput, 'email' | 'verifyNumber'>;

/* -------------------------------- 인증 이메일 전송 (회원가입)------------------------------- */
export const sendMail = (credentials: SendMailRequestBody) => {
  return http.post<any>('/auth/sign-up/emails', credentials);
};

/* -------------------------------- 인증 이메일 전송 (비밀번호 재설정)------------------------------- */
export const passwordSendMail = (credentials: SendMailRequestBody) => {
  return http.post<any>('/auth/password/emails', credentials);
};

/* ------------------------------- 이메일 인증코드 확인 ------------------------------ */
export const checkCode = ({ email, verifyNumber }: CheckCodeRequestBody) => {
  return http.post<any>('/auth/emails/verify', {
    email,
    verifyNumber,
  });
};
