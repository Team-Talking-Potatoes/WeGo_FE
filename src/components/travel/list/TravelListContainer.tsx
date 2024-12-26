import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getTravels } from '@/api/travelApi';
import { InitialFilters } from '@/@types/travel';
import { QUERY_KEYS } from '@/constants/querykeys';
import TravelFilter from './TravelFilter';
import TravelList from './TravelList';

const TravelListContainer = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERY_KEYS.TRAVEL.TRAVEL_LIST(InitialFilters),
    queryFn: ({ pageParam = 1 }) =>
      getTravels({ ...InitialFilters, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TravelFilter />
      <TravelList />
    </HydrationBoundary>
  );
};

export default TravelListContainer;
