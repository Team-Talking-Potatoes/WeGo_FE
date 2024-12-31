import { http } from '../fetcher';

interface SignupRequestBody {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthDate: number;
  contact: string;
  verifiedToken: string;
}

export const signup = (credentials: SignupRequestBody) => {
  return http.post<any>('/auth/sign-up', credentials);
};
