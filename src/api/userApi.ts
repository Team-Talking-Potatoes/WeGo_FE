import { APIError } from '@/@types/api';
import { UserList } from '@/@types/user';

export const fetchPopularUser = async (): Promise<UserList[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/popular`,
  );
  if (!response.ok) {
    const error = new Error('Get popular user failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }
  return response.json();
};
