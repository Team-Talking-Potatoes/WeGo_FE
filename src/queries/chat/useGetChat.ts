import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getChat, getChatOverview } from '@/api/chat/chatApi';
import { useEffect } from 'react';

export const useGetChat = (chatId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['chat', chatId] });
    };
  }, [chatId, queryClient]);

  return useInfiniteQuery({
    queryKey: ['chat', chatId],
    queryFn: ({ pageParam }: { pageParam: number }) => {
      return getChat(chatId, pageParam as number);
    },
    initialPageParam: -1,
    getNextPageParam: (lastPage) => {
      if (
        !lastPage?.data.chatMessages ||
        lastPage.data.chatMessages.length === 0
      ) {
        return undefined;
      }
      const oldestMessage = Number(lastPage.data.chatMessages[0].chatMessageId);
      return oldestMessage;
    },
    staleTime: Infinity,
  });
};

export const useGetChatOverview = (chatId: string) => {
  return useQuery({
    queryKey: ['overview', chatId],
    queryFn: () => getChatOverview(chatId),
  });
};
