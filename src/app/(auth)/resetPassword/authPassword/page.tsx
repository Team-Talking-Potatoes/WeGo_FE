'use client';

import AuthPassword from '@/components/auth/input/AuthPassword';
import useAuthInput from '@/hooks/useAuthInput';
import { useEffect } from 'react';
import validate from '@/utils/validateAuthInput';
import { Button } from '@/components/common/button/Button';
import { useSearchParams, useRouter } from 'next/navigation';
import { useResetAuthPassword } from '@/queries/auth/useResetPassword';
import Header from '@/components/common/header/Header';
import FormTitle from '@/components/common/form/FormTitle';

const AuthPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const password = useAuthInput({ name: 'password' });
  const passwordConfirm = useAuthInput({
    name: 'passwordConfirm',
    password: password.value,
  });

  const { mutate: resetAuthPassword } = useResetAuthPassword();

  const isFormValid = () => {
    return password.isValid && passwordConfirm.isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetAuthPassword({
      email: email ?? '',
      password: password.value,
      token: token ?? '',
    });
  };

  useEffect(() => {
    if (!email && !token) {
      router.back();
    }
  }, [email, token, router]);

  useEffect(() => {
    if (passwordConfirm.value) {
      passwordConfirm.setIsValid(
        validate({
          name: 'passwordConfirm',
          value: passwordConfirm.value,
          password: password.value,
        }),
      );
    }
  }, [password.value, passwordConfirm]);

  return (
    <>
      <Header title="비밀번호 변경" />

      <div className="mx-5 mt-[100px] flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-[500px]">
          <FormTitle title="비밀번호 변경" />

          <h1 className="title-5-sb mx-auto mb-6 w-full">
            새로운 비밀번호를 입력해주세요.
          </h1>

          <AuthPassword
            name="password"
            value={password.value}
            isValid={password.isValid}
            important
            onChange={password.handleChange}
          />

          <AuthPassword
            name="passwordConfirm"
            value={passwordConfirm.value}
            isValid={passwordConfirm.isValid}
            important
            onChange={passwordConfirm.handleChange}
          />

          <Button
            label="완료"
            type="submit"
            size="full"
            className="mt-[296px]"
            disabled={!isFormValid()}
          />
        </form>
      </div>
    </>
  );
};

export default AuthPasswordPage;
