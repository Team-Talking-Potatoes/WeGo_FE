import { getChatRooms } from '@/api/chat/chatRoomsApi';
import { useQuery } from '@tanstack/react-query';
import { SortType } from '@/@types/chat';

const useGetChatRooms = (sortBy: SortType) => {
  return useQuery({
    queryKey: ['chatRooms', sortBy],
    queryFn: ({ queryKey }) => {
      const [, sort] = queryKey as [string, SortType];
      return getChatRooms(sort);
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false, // 윈도우 포커스 시 리패칭 방지
    refetchOnReconnect: false, // 네트워크 복구 시 리패칭 방지
    refetchOnMount: false, // 컴포넌트 마운트 시 리패칭 방지
  });
};

export default useGetChatRooms;
