/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import ChatRoomsContainer from '@/components/chat/chatRoomList/ChatRoomsContainer';
import ChatRoomContainer from '@/components/chat/chatRoom/ChatRoomContainer';
import { useState, useEffect } from 'react';
import { useChatRooms } from '@/hooks/useChatRooms';
import MainNavigation from '@/components/nav/MainNavigation';
import PCHeader from '@/components/header/PCHeader';
import { useWebSocketStore } from '@/store/useWebSocketStore';
import useGetUser from '@/queries/user/useGetUser';

const ChatRoomsPage = () => {
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);
  const {
    connected,
    connect,
    disconnect,
    subscribeToAlarm,
    unsubscribeFromAlarm,
  } = useWebSocketStore();
  const { data } = useGetUser();
  const userId = data?.userId;

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  useEffect(() => {
    if (connected && userId) {
      subscribeToAlarm(`${userId}`);
    } else {
      console.warn('WebSocket is not connected yet');
    }

    return () => {
      unsubscribeFromAlarm(`${userId}`);
    };
  }, [connected, subscribeToAlarm, unsubscribeFromAlarm, userId]);

  const handleChatRoomId = (chatId: string) => {
    setChatRoomId(chatId);
  };

  const chatRoomsData = useChatRooms();

  const handleCloseChatRoom = () => {
    setChatRoomId(null);
  };

  if (chatRoomsData.error && !chatRoomsData.isFetching) {
    console.error('에러', { error: chatRoomsData.error });
    return (
      <div>
        데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.
        <p>{chatRoomsData.error.message}</p>
      </div>
    );
  }

  const selectedRoom = chatRoomsData.sortedRooms?.find(
    (room) => room.chatId === chatRoomId,
  );

  return (
    <div className="relative bg-background-alternative">
      <div className="hidden xl:block">
        <PCHeader />
      </div>
      <div className="mx-auto flex h-dvh max-w-[1400px] overflow-y-hidden bg-background-normal">
        <div
          className={`relative w-full ${chatRoomId === null ? 'block' : 'hidden'} md:block md:min-w-[383px] md:max-w-[450px] md:border-r md:border-[#D9D9D9] xl:mt-20 xl:h-[calc(100dvh-80px)]`}
        >
          <ChatRoomsContainer
            chatRoomId={chatRoomId as string}
            onChatRoomId={handleChatRoomId}
            chatRoomsData={chatRoomsData}
          />
        </div>
        {chatRoomId && selectedRoom && (
          <div className="relative w-full flex-col overflow-hidden md:flex xl:mt-20 xl:h-[calc(100dvh-80px)]">
            <ChatRoomContainer
              onCloseChatRoom={handleCloseChatRoom}
              chatRoomId={chatRoomId}
              selectedRoom={selectedRoom}
            />
          </div>
        )}
      </div>
      <div
        className={`${selectedRoom?.hasJoined ? 'hidden' : 'block'} md:block xl:hidden`}
      >
        <MainNavigation isActive />
      </div>
    </div>
  );
};
export default ChatRoomsPage;
