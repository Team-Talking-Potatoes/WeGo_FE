import { APIError } from '@/@types/api';
import { User } from '@/@types/user';

type LoginRequestBody = Pick<User, 'email' | 'password'>;

export const login = async (credentials: LoginRequestBody) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-in`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    },
  );

  if (!response.ok) {
    const error = new Error('Login failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};
