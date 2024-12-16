import { login } from './login';
import { signup } from './signup';
import { resetPassword } from './resetPassword';
import { deleteAccount } from './deleteAccount';
import { findPassword } from './findPassword';

export const auth = [login, signup, resetPassword, deleteAccount, findPassword];
