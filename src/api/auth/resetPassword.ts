import { http } from '../fetcher';

interface ResetAuthPasswordRequestBody {
  email: string;
  password: string;
  token: string;
}

interface ResetUserPasswordRequestBody {
  currentPassword: string;
  newPassword: string;
}

export const resetAuthPassword = (
  credentials: ResetAuthPasswordRequestBody,
) => {
  return http.put<any>('/auth/password', credentials);
};

export const resetUserPassword = (
  credentials: ResetUserPasswordRequestBody,
) => {
  return http.put<any>('/users/password', credentials);
};
