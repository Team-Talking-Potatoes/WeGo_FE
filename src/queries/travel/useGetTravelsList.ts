import { Filters } from '@/@types/travel';
import { getTravels } from '@/api/travel/travels';
import { QUERY_KEYS } from '@/constants/querykeys';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetTravelsList = (filters: Filters) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.TRAVEL.TRAVEL_LIST(filters),
    queryFn: ({ pageParam = 0 }) => getTravels({ ...filters, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.hasNext ? pages.length : undefined;
    },
  });
};

export default useGetTravelsList;
