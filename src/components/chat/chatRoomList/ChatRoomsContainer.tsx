'use client';

import ChatHeader from '@/components/chat/chatRoomList/ChatHeader';
import ChatRoomList from '@/components/chat/chatRoomList/ChatRoomList';
import Chat from '@/assets/chat_gray.svg';
import { RoomResponse, SortType } from '@/@types/chat';
import ChatRoomListSkeleton from '@/components/chat/skeleton/ChatRoomListSkeleton';

interface Rooms {
  data: RoomResponse[];
}

interface ChatRooms {
  data: Rooms | undefined;
  sortedRooms: RoomResponse[] | null;
  currentSort: SortType;
  isFetching: boolean;
  isLoading: boolean;
  error: Error | null;
  handleExitRoom: (id: string) => void;
  handleSortRooms: (sort: SortType) => void;
}

interface Props {
  onChatRoomId: (chatId: string) => void;
  chatRoomsData: ChatRooms;
  chatRoomId: string;
}

const ChatRoomsContainer = ({
  onChatRoomId,
  chatRoomsData,
  chatRoomId,
}: Props) => {
  const {
    sortedRooms,
    currentSort,
    isFetching,
    isLoading,
    error,
    handleSortRooms,
  } = chatRoomsData;

  if (error && !isFetching) {
    console.error('에러', { error });
    return (
      <div>
        데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <ChatHeader onSortChange={handleSortRooms} sortBy={currentSort} />

      {isLoading && <ChatRoomListSkeleton />}

      {!isLoading && sortedRooms?.length === 0 && (
        <div className="flex h-[calc(100vh-140px)] flex-col items-center justify-center md:mt-[120px] md:justify-start xl:mt-[240px]">
          <Chat className="mb-4" />
          <p className="body-1-m text-center text-label-alternative">
            여행에 참여하여
            <br />
            채팅을 시작 해 보세요!
          </p>
        </div>
      )}

      {!isLoading && sortedRooms && sortedRooms.length > 0 && (
        <ChatRoomList
          rooms={sortedRooms as RoomResponse[]}
          onChatRoomId={onChatRoomId}
          chatRoomId={chatRoomId}
        />
      )}
    </>
  );
};
export default ChatRoomsContainer;
