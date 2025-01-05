/* eslint-disable react-hooks/exhaustive-deps */
import { useGetChat } from '@/queries/chat/useGetChat';
import { useState, useEffect, useRef } from 'react';
import { ChattingResponse } from '@/@types/chat';
import { useWebSocketStore } from '@/store/useWebSocketStore';

export const useChat = (chatId: string) => {
  const {
    messages,
    unreadCounts,
    connected,
    sendMessage,

    subscribeToChat,
    unsubscribeFromChat,
  } = useWebSocketStore();

  useEffect(() => {
    if (connected) {
      subscribeToChat(chatId);
    } else {
      console.warn('WebSocket is not connected yet');
    }

    return () => {
      unsubscribeFromChat(chatId);
    };
  }, [connected, subscribeToChat, unsubscribeFromChat, chatId]);

  const [chatInfo, setChatInfo] = useState<ChattingResponse | null>(null);
  const isFetchingPreviousRef = useRef<boolean>(false);

  const {
    data,
    isFetching,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetChat(chatId);

  const handleSendMessage = (content: string, images: string[]) => {
    sendMessage(chatId, { message: content, images });
  };

  useEffect(() => {
    if (data) {
      isFetchingPreviousRef.current = true;
      setChatInfo((prev) => {
        if (!prev) {
          return {
            chatTitle: data.pages[0].data.chatTitle,
            chatMessages: [...data.pages[0].data.chatMessages].reverse(),
          };
        }

        // 기존 메시지와 새 메시지 병합
        const newMessages = [
          ...data.pages.flatMap((page) => page.data.chatMessages).reverse(),
          ...prev.chatMessages,
        ];

        // 중복 제거 (고유 ID로 필터링)
        const uniqueMessages = Array.from(
          new Map(newMessages.map((msg) => [msg.chatMessageId, msg])).values(),
        );

        return {
          ...prev,
          chatMessages: uniqueMessages,
        };
      });
    }
  }, [data]);

  // messages 변경 시 chatInfo 동기화
  useEffect(() => {
    if (!messages[chatId]) return;

    setChatInfo((prev) => {
      if (!prev) return null;

      const newMessages = messages[chatId];

      // 기존 메시지와 병합 (중복 방지)
      const updatedMessages = [
        ...prev.chatMessages.filter(
          (msg) =>
            !newMessages.some(
              (newMsg) => newMsg.chatMessageId === msg.chatMessageId,
            ),
        ),
        ...newMessages,
      ];
      return {
        ...prev,
        chatMessages: updatedMessages,
      };
    });
  }, [messages[chatId]]);

  return {
    data,
    chatInfo,
    unreadCount: unreadCounts[chatId],
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    error,
    isFetchingPreviousRef,
    fetchNextPage,
    handleSendMessage,
  };
};
