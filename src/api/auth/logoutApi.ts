import { APIError } from '@/@types/api';

export const logout = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-out`,
    {
      method: 'POST',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const error = new Error('Logout failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};
