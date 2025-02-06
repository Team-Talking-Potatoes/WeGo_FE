import { AuthInput } from '@/@types/auth';
import { BaseResponse } from '@/@types/api';
import { http } from '../fetcher';

interface ResetAuthPasswordRequestBody
  extends Pick<AuthInput, 'email' | 'newPassword'> {
  token: string;
}

type ResetUserPasswordRequestBody = Pick<
  AuthInput,
  'currentPassword' | 'newPassword'
>;

/* ---------------------------- 비밀번호 재설정 (비 로그인) ---------------------------- */
export const resetAuthPassword = (
  credentials: ResetAuthPasswordRequestBody,
) => {
  return http.put<BaseResponse<object>>('/auth/password', credentials);
};

/* ---------------------------- 비밀번호 재설정 (로그인) ---------------------------- */
export const resetUserPassword = (
  credentials: ResetUserPasswordRequestBody,
) => {
  return http.put<BaseResponse<object>>('/users/password', credentials);
};
