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
  });
};

export default useGetChatRooms;
