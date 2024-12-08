'use client';

import AuthEmailCertification from '@/components/auth/input/AuthEmailCertification';
import FormHeader from '@/components/common/formheader/FormHeader';
import useAuthInput from '@/hooks/useAuthInput';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/button/Button';

const FindPasswordPage = () => {
  const router = useRouter();

  const email = useAuthInput({ name: 'email' });
  const emailCode = useAuthInput({ name: 'emailCode' });
  const [isEmailCertified, setIsEmailCertified] = useState<boolean | null>(
    null,
  );
  const [certifiedToken, setCertifiedToken] = useState('');

  const isFormValid = () => {
    return isEmailCertified && email.isValid && emailCode.isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/resetPassword?email=${email.value}&token=${certifiedToken}`);
  };

  return (
    <div>
      <FormHeader title="비밀번호 찾기" />

      <div className="mx-auto mt-10 flex max-w-[335px] justify-center">
        <form onSubmit={handleSubmit} className="w-full">
          <AuthEmailCertification
            email={email}
            emailCode={emailCode}
            isEmailCertified={isEmailCertified}
            setIsEmailCertified={setIsEmailCertified}
            setCertifiedToken={setCertifiedToken}
          />

          <Button
            label="다음"
            type="submit"
            className="mt-[362px]"
            disabled={!isFormValid()}
          />
        </form>
      </div>
    </div>
  );
};

export default FindPasswordPage;
