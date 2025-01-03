'use client';

import { Button } from '@/components/common/button/Button';
import FormTitle from '@/components/common/form/FormTitle';
import useCheckPassword from '@/queries/auth/useCheckPassword';
import useDeleteAccount from '@/queries/auth/useDeleteAccount';
import useGetUser from '@/queries/user/useGetUser';
import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';
import useAuthInput from '@/hooks/useAuthInput';
import AuthDescription from '../description/AuthDescription';
import AuthPassword from '../input/AuthPassword';

const DeleteForm = () => {
  const password = useAuthInput({ name: 'password' });
  const { showModal } = useModal();
  const router = useRouter();

  const { data: user } = useGetUser();
  const { mutate: deleteAccount } = useDeleteAccount();
  const { mutate: checkPassword } = useCheckPassword(() => {
    showModal(
      '탈퇴를 진행하시겠습니까?',
      `계정 탈퇴를 진행하시면,\n${user?.nickname} 님의 여행과 관련된 데이터가\n모두 사라집니다.`,
      {
        cancelText: '취소',
        confirmText: '확인',
        type: 'error',
        onCancel: () => {
          router.push('/mypage');
        },
        onConfirm: deleteAccount,
      },
    );
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkPassword({ password: password.value });
  };

  return (
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
        hover="error"
        className="mt-[372px]"
        disabled={!password.isValid}
      />
    </form>
  );
};

export default DeleteForm;
