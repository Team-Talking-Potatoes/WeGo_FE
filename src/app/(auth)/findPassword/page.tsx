'use client';

import AuthEmailCertification from '@/components/auth/input/AuthEmailCertification';
import Header from '@/components/common/header/Header';
import useAuthInput from '@/hooks/useAuthInput';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/button/Button';

import usePasswordSendMail from '@/queries/auth/usePasswordSendMail';
import FormTitle from '@/components/common/form/FormTitle';

const FindPasswordPage = () => {
  const router = useRouter();

  const email = useAuthInput({ name: 'email' });
  const verifyNumber = useAuthInput({ name: 'verifyNumber' });
  const [isEmailCertified, setIsEmailCertified] = useState<boolean | null>(
    null,
  );
  const [certifiedToken, setCertifiedToken] = useState('');
  const [due, setDue] = useState(300);
  const [successMailSend, setSuccessMailSend] = useState<boolean | null>(null);

  const isFormValid = () => {
    return isEmailCertified && email.isValid && verifyNumber.isValid;
  };

  const { mutate: passwordSendMail } = usePasswordSendMail(
    () => {
      if (!successMailSend) {
        setSuccessMailSend(true);
      }
      setDue(300);
      verifyNumber.setIsValid(false);
      verifyNumber.setValue('');
    },
    () => {
      setSuccessMailSend(false);
    },
  );

  const clickNext = () => {
    router.push(
      `/resetPassword/authPassword?email=${email.value}&token=${certifiedToken}`,
    );
  };

  return (
    <div>
      <Header title="비밀번호 찾기" />

      <div className="mx-5 mt-[100px] flex justify-center">
        <div className="w-full max-w-[500px]">
          <FormTitle title="비밀번호 찾기" />

          <AuthEmailCertification
            email={email}
            verifyNumber={verifyNumber}
            isEmailCertified={isEmailCertified}
            due={due}
            setDue={setDue}
            successMailSend={successMailSend}
            sendMail={passwordSendMail}
            setIsEmailCertified={setIsEmailCertified}
            setCertifiedToken={setCertifiedToken}
          />

          <Button
            label="다음"
            type="submit"
            size="full"
            className="mt-[362px]"
            disabled={!isFormValid()}
            handler={clickNext}
          />
        </div>
      </div>
    </div>
  );
};

export default FindPasswordPage;
