'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

const ReviewModal = ({ children }: { children: ReactNode }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  return createPortal(
    <dialog
      onClose={() => router.back()}
      className="fixed left-1/2 top-1/2 z-30 m-0 flex h-fit w-[343px] -translate-x-1/2 -translate-y-1/2 transform rounded-lg"
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default ReviewModal;
