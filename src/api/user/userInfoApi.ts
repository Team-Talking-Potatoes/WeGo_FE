interface UserInfo {
  nickname: string;
  email: string;
  description: string;
  profileImage: string;
}

interface GetUserInfoError extends Error {
  status?: number;
  message: string;
}

const getUserInfo = async (): Promise<UserInfo> => {
  const res = await fetch('/api/users', {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    const error = new Error('Login failed') as GetUserInfoError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

export default getUserInfo;
