'use client';

import useModal from '@/hooks/useModal';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { showModal } = useModal();
  const router = useRouter();

  useEffect(() => {
    console.error(error);

    showModal('문제가 발생했습니다.', '예기치 못한 오류가 발생했습니다.', {
      icon: ModalErrorIcon,
      cancelText: '취소',
      confirmText: '다시 시도',
      onConfirm: () => {
        startTransition(() => {
          router.refresh();
          reset();
        });
      },
    });
  }, [error, showModal, router, reset]);

  return null;
}