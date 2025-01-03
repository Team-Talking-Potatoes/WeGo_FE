import SignupForm from '@/components/auth/form/SignupForm';
import Header from '@/components/common/header/Header';
import Link from 'next/link';
import { Suspense } from 'react';

const Signup = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header title="회원가입" />

      <div className="mx-5">
        <div className="mx-auto mt-[100px] flex max-w-[500px] justify-center xl:mt-[120px]">
          <SignupForm />
        </div>
      </div>

      <div className="mb-[50px] mt-6 flex justify-center text-sm">
        <span className="text-gray-400">이미 회원이신가요?</span>
        <Link href="/login" className="ml-[6px] text-primary-normal underline">
          로그인
        </Link>
      </div>
    </Suspense>
  );
};

export default Signup;
