import { useEffect, useState } from 'react';
import useGetChatRooms from '@/queries/chat/useGetChatRooms';
import { RoomResponse, SortType } from '@/@types/chat';
import { sortRooms } from '@/utils/chat';

export const useChatRooms = () => {
  const [currentSort, setCurrentSort] = useState<SortType>('latest');
  const [sortedRooms, setSortedRooms] = useState<RoomResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data, isFetching, error } = useGetChatRooms(currentSort);

  const handleSortRooms = (sort: SortType) => {
    setCurrentSort(sort);
  };

  const handleExitRoom = (id: string) => {
    setSortedRooms(
      (prevRooms) => prevRooms?.filter((room) => room.chatId !== id) || null,
    );
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSort =
        (localStorage.getItem('sortBy') as SortType | null) || 'latest';
      setCurrentSort(savedSort);
    }
  }, []);

  useEffect(() => {
    if (data?.data) {
      setSortedRooms(sortRooms(data.data, currentSort));
      setIsLoading(false);
    }
  }, [data?.data, currentSort]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sortBy', currentSort);
    }
  }, [currentSort]);

  return {
    data,
    sortedRooms,
    currentSort,
    isFetching,
    isLoading,
    error,
    handleExitRoom,
    handleSortRooms,
  };
};
