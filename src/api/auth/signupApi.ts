interface SignupError extends Error {
  status?: number;
  message: string;
}

interface SignupRequestBody {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthDate: number;
  contact: string;
  verifiedToken: string;
}

export const signup = async (credentials: SignupRequestBody) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-up`,
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
    const error = new Error('Signup failed') as SignupError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};
