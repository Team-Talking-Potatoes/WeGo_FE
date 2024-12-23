'use client';

import { useEffect, useState } from 'react';
import ToTopIcon from '@/assets/to_top.svg';
import { throttle } from 'lodash';

const ToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScrollToTop = throttle(() => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 200);

    window.addEventListener('scroll', handleScrollToTop);

    return () => {
      window.removeEventListener('scroll', handleScrollToTop);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    isVisible && (
      <button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-28 right-5 z-30 flex h-12 w-12 items-center justify-center border border-black bg-white"
        aria-label="위로 가기"
      >
        <ToTopIcon />
      </button>
    )
  );
};

export default ToTop;
