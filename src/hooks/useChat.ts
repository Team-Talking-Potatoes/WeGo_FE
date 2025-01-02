import { useGetChat } from '@/queries/chat/useGetChat';
import { useState, useEffect, useRef } from 'react';
import { ChattingResponse, ChatMessage } from '@/@types/chat';
// import { useWebSocketStore } from '@/store/useWebSocketStore';

export const useChat = (
  chatId: string,
  sender: string,
  participantsCount: number,
) => {
  // const {
  //   connect,
  //   disconnect,
  //   subscribeToChat,
  //   unsubscribeFromChat,
  //   sendMessage,
  //   connected,
  //   messages,
  // } = useWebSocketStore();

  // useEffect(() => {
  //   connect();

  //   return () => {
  //     disconnect();
  //   };
  // }, [connect, disconnect]);

  // useEffect(() => {
  //   if (connected) {
  //     subscribeToChat(chatId);
  //   } else {
  //     console.warn('WebSocket is not connected yet');
  //   }

  //   return () => {
  //     unsubscribeFromChat(chatId);
  //   };
  // }, [chatId, connected, subscribeToChat, unsubscribeFromChat]);

  const {
    data,
    isFetching,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetChat(chatId);

  const [chatInfo, setChatInfo] = useState<ChattingResponse | null>(null);
  const isFetchingPreviousRef = useRef<boolean>(false);

  const handleSendMessage = (content: string, images: string[]) => {
    const newMessage = {
      chatMessageId: `${Date.now()}`,
      sender,
      content,
      senderProfileImage: '/user.jpg',
      images,
      createdAt: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      unreadCount: participantsCount,
    };

    setChatInfo((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        chatMessages: [...(prev.chatMessages as ChatMessage[]), newMessage],
      };
    });
    // sendMessage(chatId, { content, images });
  };

  useEffect(() => {
    if (data) {
      isFetchingPreviousRef.current = true;
      setChatInfo((prev) => {
        if (!prev) {
          return {
            ...data.pages[0].data,
          };
        }

        return {
          ...prev,
          chatMessages: [
            ...data.pages[data.pages.length - 1].data.chatMessages,
            ...prev.chatMessages,
          ],
        };
      });
    }
  }, [data]);

  // useEffect(() => {
  //   if (messages[chatId] && data) {
  //     setChatInfo((prev) => {
  //       if (!prev) {
  //         return {
  //           ...data.pages[0].data,
  //           chatMessages: messages[chatId],
  //         };
  //       }

  //       return {
  //         ...prev,
  //         chatMessages: [...messages[chatId], ...prev.chatMessages],
  //       };
  //     });
  //   }
  // }, [messages]);

  return {
    data,
    chatInfo,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    error,
    isFetchingPreviousRef,
    fetchNextPage,
    handleSendMessage,
  };
};
