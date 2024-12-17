import { APIError } from '@/@types/api';

interface ResetAuthPasswordRequestBody {
  email: string;
  password: string;
  token: string;
}

interface ResetUserPasswordRequestBody {
  currentPassword: string;
  newPassword: string;
}

export const resetAuthPassword = async (
  credentials: ResetAuthPasswordRequestBody,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/password`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    },
  );

  if (!response.ok) {
    const error = new Error('Reset Auth Password failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};

export const resetUserPassword = async (
  credentials: ResetUserPasswordRequestBody,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/password`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    },
  );

  if (!response.ok) {
    const error = new Error('Reset User Password failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};
