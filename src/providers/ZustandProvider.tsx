'use client';

import Toast from '@/components/common/toast/Toast';
import { PropsWithChildren } from 'react';

const ZustandProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <Toast />
      {/* 추후 다른 전역 UI 컴포넌트들도 여기에 추가 */}
    </>
  );
};

export default ZustandProvider;
