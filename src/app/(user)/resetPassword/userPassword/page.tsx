'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/common/header/Header';

const ResetUserPasswordForm = dynamic(
  () => import('@/components/auth/form/ResetUserPasswordForm'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  },
);

const UserPassword = () => {
  return (
    <>
      <Header title="비밀번호 변경" isConfigButton />
      <div className="mx-5 mt-[100px] flex justify-center xl:mt-[120px]">
        <ResetUserPasswordForm />
      </div>
    </>
  );
};

export default UserPassword;
