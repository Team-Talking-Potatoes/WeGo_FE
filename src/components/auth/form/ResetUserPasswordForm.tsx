'use client';

import FormTitle from '@/components/common/form/FormTitle';
import { Button } from '@/components/common/button/Button';
import { useResetUserPassword } from '@/queries/auth/useResetPassword';
import useAuthInput from '@/hooks/useAuthInput';
import AuthDescription from '../description/AuthDescription';
import AuthPassword from '../input/AuthPassword';

const ResetUserPassword = () => {
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
  );
};

export default ResetUserPassword;
