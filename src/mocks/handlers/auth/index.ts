import { verifyToken } from './verifyToken';
import { login } from './login';
import { logout } from './logout';
import { signup } from './signup';
import { resetPassword } from './resetPassword';
import { deleteAccount } from './deleteAccount';
import { findPassword } from './findPassword';

export const auth = [
  verifyToken,
  login,
  logout,
  findPassword,
  ...resetPassword,
  ...signup,
  ...deleteAccount,
];
