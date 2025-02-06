import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getChat, getChatOverview } from '@/api/chat/chatApi';
import { useEffect } from 'react';
import useHandleChatError from '@/hooks/useHandleChatError';

export const useGetChat = (chatId: string) => {
  const handleChatError = useHandleChatError();
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['chat', chatId] });
    };
  }, [chatId, queryClient]);

  return useInfiniteQuery({
    queryKey: ['chat', chatId],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      try {
        return await getChat(chatId, pageParam);
      } catch (error: any) {
        handleChatError(error);
        throw error;
      }
    },
    initialPageParam: -1,
    getNextPageParam: (lastPage) => {
      if (
        !lastPage?.data.chatMessages ||
        lastPage.data.chatMessages.length === 0
      ) {
        return undefined;
      }
      const oldestMessage = Number(
        lastPage.data.chatMessages[lastPage.data.chatMessages.length - 1]
          .chatMessageId,
      );
      return oldestMessage;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false, // 윈도우 포커스 시 리패칭 방지
    refetchOnReconnect: false, // 네트워크 복구 시 리패칭 방지
    refetchOnMount: false, // 컴포넌트 마운트 시 리패칭 방지
  });
};

export const useGetChatOverview = (chatId: string) => {
  return useQuery({
    queryKey: ['overview', chatId],
    queryFn: () => getChatOverview(chatId),
  });
};
