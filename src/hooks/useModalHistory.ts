import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const useModalHistory = ({ isOpen, closeModal }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathRef = useRef(pathname);
  const prevSearchParamsRef = useRef(searchParams);

  // popstate 이벤트 처리
  useEffect(() => {
    if (isOpen) {
      const handlePopState = () => {
        closeModal();
      };

      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }

    return () => {};
  }, [isOpen, closeModal]);

  // URL 변경 감지
  useEffect(() => {
    if (
      (pathname !== prevPathRef.current ||
        searchParams !== prevSearchParamsRef.current) &&
      isOpen
    ) {
      closeModal();
    }
    prevPathRef.current = pathname;
    prevSearchParamsRef.current = searchParams;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]); // URL 변경시에만 실행
};

export default useModalHistory;
