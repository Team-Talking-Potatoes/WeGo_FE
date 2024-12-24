import { Filters } from '@/@types/travel';
import { getTravels } from '@/api/travelApi';
import { QUERY_KEYS } from '@/constants/querykeys';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetTravelsList = (filters: Filters) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.TRAVEL.TRAVEL_LIST(filters),
    queryFn: ({ pageParam }) => getTravels({ pageParam, ...filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNext ? pages.length + 1 : undefined;
    },
  });
};

export default useGetTravelsList;
