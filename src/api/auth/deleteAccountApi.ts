import { APIError } from '@/@types/api';

export const checkPassword = async (password: { password: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/check/password`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(password),
    },
  );

  if (!response.ok) {
    const error = new Error('Check Password failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};

export const deleteAccount = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = new Error('Delete Account failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};
