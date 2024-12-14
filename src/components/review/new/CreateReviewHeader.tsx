'use client';

import CloseIcon from '@/assets/close_20px.svg';
import { useRouter } from 'next/navigation';

const CreateReviewHeader = () => {
  const router = useRouter();

  return (
    <div className="title-4-b flex w-full items-center justify-between border-b border-line-normal pb-4 text-label-normal">
      <header>리뷰 작성</header>
      <button
        type="button"
        onClick={() => {
          router.back();
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default CreateReviewHeader;
