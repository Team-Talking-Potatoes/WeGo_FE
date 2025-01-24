import { TextInput } from '@/@types/auth';
import { BaseResponse } from '@/@types/api';
import { http } from '../fetcher';

type SendMailRequestBody = Pick<TextInput, 'email'>;
type CheckCodeRequestBody = Pick<TextInput, 'email' | 'verifyNumber'>;

/* -------------------------------- 인증 이메일 전송 (회원가입)------------------------------- */
export const sendMail = (credentials: SendMailRequestBody) => {
  return http.post<BaseResponse<object>>('/auth/emails/sign-up', credentials);
};

/* -------------------------------- 인증 이메일 전송 (비밀번호 재설정)------------------------------- */
export const passwordSendMail = (credentials: SendMailRequestBody) => {
  return http.post<BaseResponse<object>>('/auth/emails/password', credentials);
};

/* ------------------------------- 이메일 인증코드 확인 ------------------------------ */
export const checkCode = ({ email, verifyNumber }: CheckCodeRequestBody) => {
  return http.post<BaseResponse<object>>('/auth/emails/verification', {
    email,
    verifyNumber,
  });
};
