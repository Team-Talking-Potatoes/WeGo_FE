'use client';

import ChatRoomEntrance from '@/components/chat/chatRoom/ChatRoomEntrance';
import ChatRoom from '@/components/chat/chatRoom/ChatRoom';
import Chat from '@/assets/chat_gray.svg';
import { RoomResponse } from '@/@types/chat';

interface Props {
  chatRoomId: string;
  selectedRoom: RoomResponse;
  onCloseChatRoom: () => void;
}

const ChatRoomContainer = ({
  chatRoomId,
  selectedRoom,
  onCloseChatRoom,
}: Props) => {
  if (chatRoomId === null) {
    return (
      <>
        <h2 className="title-5-sb flex min-h-[60px] min-w-[383px] items-center justify-center border-b border-line-normal text-label-normal xl:hidden">
          채팅
        </h2>
        <div className="flex h-[calc(100vh-140px)] flex-col items-center justify-center md:mt-[120px] md:justify-start xl:mt-[300px]">
          <Chat className="mb-4" />
          <p className="body-1-m text-center text-label-alternative">
            여행에 참여하여
            <br />
            채팅을 시작 해 보세요!
          </p>
        </div>
      </>
    );
  }

  if (selectedRoom?.hasJoined) {
    return (
      <ChatRoom
        key={chatRoomId}
        chatId={chatRoomId}
        onCloseChatRoom={onCloseChatRoom}
      />
    );
  }

  return (
    <ChatRoomEntrance
      key={chatRoomId}
      chatRoomData={selectedRoom}
      chatId={chatRoomId}
      onCloseChatRoom={onCloseChatRoom}
    />
  );
};

export default ChatRoomContainer;
