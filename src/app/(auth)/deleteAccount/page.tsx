'use client';

import AuthDescription from '@/components/auth/description/AuthDescription';
import AuthPassword from '@/components/auth/input/AuthPassword';
import { Button } from '@/components/common/button/Button';
import FormTitle from '@/components/common/form/FormTitle';
import Header from '@/components/common/header/Header';
import useAuthInput from '@/hooks/useAuthInput';
import useCheckPassword from '@/queries/auth/useCheckPassword';

const DeleteAccountPage = () => {
  const password = useAuthInput({ name: 'password' });

  const { mutate: checkPassword } = useCheckPassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkPassword({ password: password.value });
  };

  return (
    <div>
      <Header title="계정 탈퇴" isConfigButton />

      <div className="mx-5 mt-[100px] flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-[500px]">
          <FormTitle title="계정 탈퇴" />

          <AuthDescription
            text="계정을 탈퇴하기 위해 비밀번호가 필요해요."
            className="flex md:justify-center xl:justify-start"
          />

          <AuthPassword
            name="password"
            value={password.value}
            isValid={password.isValid}
            important
            onChange={password.handleChange}
          />
          <Button
            label="탈퇴하기"
            type="submit"
            size="full"
            className="mt-[372px]"
            disabled={!password.isValid}
          />
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
