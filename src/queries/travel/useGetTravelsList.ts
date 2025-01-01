import { Filters } from '@/@types/travel';
import { getTravels } from '@/api/travel/travels';
import { QUERY_KEYS } from '@/constants/querykeys';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetTravelsList = (filters: Filters) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.TRAVEL.TRAVEL_LIST(filters),
    queryFn: ({ pageParam = 1 }) => getTravels({ ...filters, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
  });
};

export default useGetTravelsList;
