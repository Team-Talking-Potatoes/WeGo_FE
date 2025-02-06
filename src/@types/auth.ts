export interface AuthInput {
  email: string;
  verifyNumber: number;
  name: string;
  nickname: string;
  birthDate: number;
  contact: string;
  currentPassword: string;
  password: string;
  newPassword: string;
  passwordConfirm: string;
}

export interface ValidateOptions {
  name: keyof AuthInput;
  value: string;
  password?: string;
}
