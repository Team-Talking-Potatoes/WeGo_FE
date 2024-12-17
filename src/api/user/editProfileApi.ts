import { APIError } from '@/@types/api';

export const editProfile = async (formData: FormData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const error = new Error('Edit profile failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};
