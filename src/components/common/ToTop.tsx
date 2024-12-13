'use client';

import { useEffect, useState } from 'react';
import ToTopIcon from '@/assets/to_top.svg';

const ToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
