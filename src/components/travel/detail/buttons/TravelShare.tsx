'use client';

import ShareIcon from '@/assets/icon/share.svg';
import CloseIcon from '@/assets/close_20px.svg';
import { usePathname } from 'next/navigation';
import TravelShareKakao from './TravelShareKakao';

const TravelShare = ({ onClose }: { onClose: () => void }) => {
  const pathname = usePathname();
  const currentUrl = window.location.origin + pathname;

  const handleCopyClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          // eslint-disable-next-line no-alert
          alert('링크가 클립보드에 복사되었습니다!');
        })
        .catch((err) => {
          console.error('링크 복사 실패:', err);
        });
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className="flex w-full justify-center xl:absolute xl:left-0">
      <div className="mt-5 flex w-[50%] animate-slide-up flex-col gap-6 rounded-md border bg-white p-5">
        <div className="body-1-m flex items-center justify-between">
          <span>공유하기</span>
          <button type="button" onClick={handleCloseClick}>
            <CloseIcon />
          </button>
        </div>
        <div className="body-2-m flex items-center justify-center gap-7 text-label-normal">
          <TravelShareKakao />
          <div className="flex flex-col items-center justify-center gap-1.5">
            <button
              type="button"
              onClick={handleCopyClick}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-label-neutral"
            >
              <ShareIcon className="h-6 w-6" />
            </button>
            <span>링크복사</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelShare;
