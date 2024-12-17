import { APIError } from '@/@types/api';

interface UserInfo {
  nickname: string;
  email: string;
  description: string;
  profileImage: string;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = new Error('Get user info failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};
