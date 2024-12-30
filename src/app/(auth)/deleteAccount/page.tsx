'use client';

import AuthDescription from '@/components/auth/description/AuthDescription';
import AuthPassword from '@/components/auth/input/AuthPassword';
import { Button } from '@/components/common/button/Button';
import FormTitle from '@/components/common/form/FormTitle';
import Header from '@/components/common/header/Header';
import useAuthInput from '@/hooks/useAuthInput';
import useCheckPassword from '@/queries/auth/useCheckPassword';
import useModal from '@/hooks/useModal';
import { useRouter } from 'next/navigation';
import useGetUser from '@/queries/user/useGetUser';
import useDeleteAccount from '@/queries/auth/useDeleteAccount';

const DeleteAccountPage = () => {
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
