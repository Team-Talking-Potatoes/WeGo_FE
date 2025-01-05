/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import Other from '@/assets/other.svg';
import Chat from '@/assets/chat_blue.svg';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/button/Button';
import { RoomResponse } from '@/@types/chat';
import { formatDateToStringWithDot } from '@/utils/calendarHelper';
import { useWebSocketStore } from '@/store/useWebSocketStore';
import { useLeaveChat } from '@/queries/chat/useSetChat';

interface Props {
  room: RoomResponse;
  onChatRoomId: (chatId: string) => void;
  selectedChatRoomId: string;
}

const ChatRoomItem = ({ room, onChatRoomId, selectedChatRoomId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { chatUpdates, resetStatus } = useWebSocketStore();
  const [unreadCount, setUnreadCount] = useState(room.unreadMessageCount);
  const { mutate: leaveChat } = useLeaveChat();

  const openModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { chatId, chattingName, host, image, membersCount, lastMessageTime } =
    room;

  useEffect(() => {
    if (selectedChatRoomId === chatId) {
      setUnreadCount(0);
    }
  }, [selectedChatRoomId, chatId]);

  useEffect(() => {
    const chatUpdate = chatUpdates[chatId];

    if (selectedChatRoomId !== chatId && chatUpdate?.status === 'MESSAGE') {
      setUnreadCount((prev) => prev + 1);
    }
  }, [chatUpdates[chatId]?.status, chatId]);

  useEffect(() => {
    if (selectedChatRoomId !== chatId && chatUpdates[chatId]?.status) {
      resetStatus(chatId);
    }
  }, [selectedChatRoomId, chatId, chatUpdates]);

  return (
    <>
      <li className="relative">
        <button
          type="button"
          onClick={() => {
            onChatRoomId(chatId);
          }}
          className={`${selectedChatRoomId === chatId && 'bg-gray-100'} flex w-full cursor-pointer items-start border-b border-line-neutral p-5 transition-all duration-300 hover:bg-gray-100`}
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
                {chatUpdates && chatUpdates[chatId]
                  ? chatUpdates[chatId].currentMemberCount
                  : membersCount}
                명
              </span>
              {chatUpdates &&
              chatUpdates[chatId] &&
              chatUpdates[chatId].status === 'MESSAGE'
                ? chatUpdates[chatId].sendAt.replace(
                    /(\d{4})(\d{2})(\d{2})/,
                    '$1.$2.$3',
                  )
                : formatDateToStringWithDot(lastMessageTime)}
            </p>
          </div>
        </button>
        {unreadCount > 0 && (
          <span className="caption-1-sb absolute right-10 top-[23px] rounded-[14px] bg-primary-normal px-1 text-primary-white">
            {unreadCount}
            {unreadCount > 100 && '+'}
          </span>
        )}
        {room.hasJoined && (
          <button
            type="button"
            onClick={openModal}
            className="absolute right-5 top-[23px]"
          >
            <Other />
          </button>
        )}
      </li>
      {isOpen && (
        <div
          className="absolute inset-0 z-50 flex items-end bg-label-strong/40 md:bottom-20 xl:bottom-0"
          onClick={closeModal}
        >
          <div
            className="z-[60px] flex w-full justify-center bg-white py-5 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              handler={() => {
                leaveChat({ chatId });
              }}
            >
              방 나가기
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatRoomItem;
