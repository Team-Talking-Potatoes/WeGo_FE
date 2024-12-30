'use client';

import AuthDescription from '@/components/auth/description/AuthDescription';
import AuthPassword from '@/components/auth/input/AuthPassword';
import { Button } from '@/components/common/button/Button';
import FormTitle from '@/components/common/form/FormTitle';
import Header from '@/components/common/header/Header';
import useAuthInput from '@/hooks/useAuthInput';
import { useResetUserPassword } from '@/queries/auth/useResetPassword';

const UserPassword = () => {
  const currentPassword = useAuthInput({ name: 'currentPassword' });
  const newPassword = useAuthInput({ name: 'newPassword' });
  const passwordConfirm = useAuthInput({
    name: 'passwordConfirm',
    password: newPassword.value,
  });

  const { mutate: resetUserPassword } = useResetUserPassword();

  const isFormValid = () => {
    return (
      currentPassword.isValid && newPassword.isValid && passwordConfirm.isValid
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetUserPassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    });
  };

  return (
    <div>
      <Header title="비밀번호 변경" isConfigButton />

      <div className="mx-5 mt-[100px] flex justify-center xl:mt-[120px]">
        <form onSubmit={handleSubmit} className="w-full max-w-[500px]">
          <FormTitle title="비밀번호 변경" />

          <AuthDescription
            text="새로운 비밀번호를 입력해주세요."
            className="flex md:justify-center xl:justify-start"
          />

          <AuthPassword
            name="currentPassword"
            value={currentPassword.value}
            isValid={currentPassword.isValid}
            important
            onChange={currentPassword.handleChange}
          />

          <AuthPassword
            name="newPassword"
            value={newPassword.value}
            isValid={newPassword.isValid}
            important
            onChange={newPassword.handleChange}
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
            className="mt-[176px]"
            disabled={!isFormValid()}
          />
        </form>
      </div>
    </div>
  );
};

export default UserPassword;
