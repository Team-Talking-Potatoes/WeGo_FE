/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import Other from '@/assets/other.svg';
import Chat from '@/assets/chat_blue.svg';
import { useState } from 'react';
import { Button } from '@/components/common/button/Button';
import { RoomResponse } from '@/@types/chat';
import { formatDateToStringWithDot } from '@/utils/calendarHelper';

interface Props {
  room: RoomResponse;
  onExit: (id: string) => void;
  onChatRoomId: (chatId: string) => void;
}

const ChatRoomItem = ({ room, onExit, onChatRoomId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const {
    chatId,
    chattingName,
    host,
    image,
    membersCount,
    unreadMessageCount,
    lastMessageTime,
  } = room;

  return (
    <>
      <li className="relative">
        <button
          type="button"
          onClick={() => {
            onChatRoomId(chatId);
          }}
          className="flex w-full cursor-pointer items-start border-b border-line-neutral p-5 transition-all duration-300 hover:bg-gray-100"
        >
          <div
            className="relative mr-2.5 h-[54px] w-[54px] shrink-0 overflow-hidden rounded-full"
            aria-label={`${chattingName}의 대표 이미지`}
          >
            <Image
              src={image}
              alt={`${chattingName}의 대표 이미지`}
              width={54}
              height={54}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mr-[60px] min-w-0 flex-1">
            <h2 className="heading-1-b mb-2 truncate text-left text-label-normal">
              {chattingName}
            </h2>
            <p className="body-2-r flex truncate text-label-alternative">
              <Chat />
              <span className="body-2-sb ml-1 text-label-neutral after:mx-1.5 after:text-line-normal after:content-['|']">
                {host}
              </span>
              <span className='after:mx-1.5 after:text-line-normal after:content-["|"]'>
                {membersCount}명
              </span>
              {formatDateToStringWithDot(lastMessageTime)}
            </p>
          </div>
        </button>
        {unreadMessageCount > 0 && (
          <span className="caption-1-sb absolute right-10 top-[23px] rounded-[14px] bg-primary-normal px-1 text-primary-white">
            {unreadMessageCount}
            {unreadMessageCount > 100 && '+'}
          </span>
        )}
        <button
          type="button"
          onClick={openModal}
          className="absolute right-5 top-[23px]"
        >
          <Other />
        </button>
      </li>
      {isOpen && (
        <div
          className="absolute inset-0 z-10 flex items-end bg-label-strong/40 md:bottom-20 xl:bottom-0"
          onClick={closeModal}
        >
          <div
            className="z-20 w-full bg-white py-5 text-center shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              handler={() => {
                onExit(chatId);
                closeModal();
              }}
              className="w-[335px]"
              size="default"
            >
              채팅방 나가기
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatRoomItem;
