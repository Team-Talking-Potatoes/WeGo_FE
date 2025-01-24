export interface TextInput {
  email: string;
  verifyNumber: number;
  name: string;
  nickname: string;
  birthDate: number;
  contact: string;
}

export interface PasswordInput {
  currentPassword: string;
  password: string;
  newPassword: string;
  passwordConfirm: string;
}

export interface ValidateOptions {
  name: keyof TextInput | keyof PasswordInput;
  value: string;
  password?: string;
}
