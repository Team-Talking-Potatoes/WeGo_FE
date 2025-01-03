interface TextInput {
  email: string;
  verifyNumber: number;
  name: string;
  nickname: string;
  birthDate: number;
  contact: string;
}

interface PasswordInput {
  currentPassword: string;
  password: string;
  newPassword: string;
  passwordConfirm: string;
}

interface ValidateOptions {
  name: keyof TextInput | keyof PasswordInput;
  value: string;
  password?: string;
}

export type { TextInput, PasswordInput, ValidateOptions };
