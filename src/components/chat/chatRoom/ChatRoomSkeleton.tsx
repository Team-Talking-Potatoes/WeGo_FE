import React from 'react';
import Back from '@/assets/back.svg';
import HamburgerMenu from '@/assets/menu.svg';
import Camera from '@/assets/camera.svg';
import Send from '@/assets/send.svg';

const ChatRoomSkeleton = () => {
  return (
    <>
      <div
        className="pointer-events-auto absolute inset-0 z-50"
        aria-hidden="true"
      />
      <header className="relative flex h-[60px] items-center border-b border-[#DADDE1] px-5 py-3.5">
        <Back width={32} height={32} aria-hidden="true" />

        <div className="absolute right-0 mr-5 h-8">
          <HamburgerMenu />
        </div>
      </header>
      <div className="flex h-[calc(100vh-140px)] flex-col items-center justify-center md:mt-[120px] md:justify-start xl:mt-[240px]" />

      <div className="absolute bottom-0 flex h-auto w-full flex-col border-t border-line-neutral bg-primary-white px-4 pb-4 pt-[15px] custom-scrollbar md:bottom-20 xl:bottom-0">
        <div className="flex items-center">
          <Camera />

          <div className="ml-2.5 flex max-w-full flex-1 flex-col gap-2.5 overflow-x-hidden rounded-3xl bg-gray-100 px-4 py-2">
            <div className="flex items-end">
              <textarea
                rows={1}
                className="body-2-r max-h-32 flex-1 resize-none overflow-y-auto bg-transparent text-label-alternative outline-none custom-scrollbar"
                placeholder="메시지 보내기"
              />
              <button type="button">
                <Send />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoomSkeleton;
