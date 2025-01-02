'use client';

import Header from '@/components/common/header/Header';
import ResetAuthPasswordForm from '@/components/auth/form/ResetAuthPasswordForm';
import { Suspense } from 'react';

const AuthPasswordPage = () => {
  return (
    <>
      <Header title="비밀번호 변경" />

      <div className="mx-5 mt-[100px] flex justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetAuthPasswordForm />
        </Suspense>
      </div>
    </>
  );
};

export default AuthPasswordPage;
