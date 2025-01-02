import { useCallback, memo, useEffect } from 'react';

import { Button } from '@/components/common/button/Button';
import formatTimeToMMSS from '@/utils/formatTimeToMMSS';
import useCheckCode from '@/queries/auth/useCheckCode';
import LoadingOverlay from '@/components/common/loding/LoadingOverlay';
import AuthText from './AuthText';

interface PropsState {
  value: string;
  isValid: boolean | null;
  setValue: (value: string) => void;
  setIsValid: (isValid: boolean | null) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props {
  email: PropsState;
  verifyNumber: PropsState;
  isEmailCertified: boolean | null;
  due: number;
  setDue: React.Dispatch<React.SetStateAction<number>>;
  successMailSend: boolean | null;
  sendMail: (credentials: { email: string }) => void;
  setIsEmailCertified: (isEmailCertified: boolean | null) => void;
  setCertifiedToken: (token: string) => void;
  isSendingMail: boolean;
}

const AuthEmailCertification = memo(
  ({
    email,
    verifyNumber,
    isEmailCertified,
    due,
    setDue,
    successMailSend,
    sendMail,
    setIsEmailCertified,
    setCertifiedToken,
    isSendingMail,
  }: Props) => {
    const { mutate: checkCode, isPending: isCheckingCode } = useCheckCode(
      (token: string) => {
        setIsEmailCertified(true);
        setCertifiedToken(token);
      },
      () => {
        setIsEmailCertified(false);
      },
    );

    const handleVerifyClick = useCallback(() => {
      sendMail({ email: email.value });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email.value, sendMail]);

    const handleConfirmClick = useCallback(() => {
      checkCode({
        email: email.value,
        verifyNumber: Number(verifyNumber.value),
      });
    }, [email.value, verifyNumber.value, checkCode]);

    useEffect(() => {
      if (!successMailSend || Boolean(isEmailCertified) || due === 0)
        return () => {};

      const timer = setInterval(() => {
        if (due <= 0) {
          clearInterval(timer);
          return;
        }
        setDue((time) => time - 1);
      }, 1000);

      return () => clearInterval(timer);
    }, [due, setDue, isEmailCertified, successMailSend]);

    return (
      <div className="relative mb-6">
        <AuthText
          type="email"
          name="email"
          value={email.value}
          disabled={Boolean(successMailSend)}
          isValid={email.isValid}
          successMailSend={successMailSend}
          important
          onChange={email.handleChange}
          className="flex-1"
        >
          <Button
            label={successMailSend || isSendingMail ? '재전송' : '인증'}
            handler={handleVerifyClick}
            size="addon"
            fill="default"
            disabled={!email.isValid || Boolean(isEmailCertified)}
            className="body-2-m mt-[6px] hover:bg-primary-normal"
          />
        </AuthText>

        <AuthText
          type="text"
          name="verifyNumber"
          value={verifyNumber.value}
          disabled={due === 0 || Boolean(isEmailCertified)}
          isValid={due === 0 ? false : isEmailCertified}
          onChange={verifyNumber.handleChange}
          className="flex-1"
          classNameCondition={{
            hidden: !successMailSend,
          }}
        >
          {successMailSend && !isEmailCertified && (
            <span className="absolute right-[126px] top-[21px] text-xs text-status-error">
              {formatTimeToMMSS(due)}
            </span>
          )}

          <Button
            label="확인"
            handler={handleConfirmClick}
            size="addon"
            disabled={
              !verifyNumber.isValid || due === 0 || Boolean(isEmailCertified)
            }
            className="body-2-m mt-[6px] hover:bg-primary-normal"
            classNameCondition={{ hidden: !successMailSend }}
          />
        </AuthText>

        {isSendingMail && <LoadingOverlay />}
        {isCheckingCode && <LoadingOverlay />}
      </div>
    );
  },
);

AuthEmailCertification.displayName = 'AuthEmailCertification';

export default AuthEmailCertification;
