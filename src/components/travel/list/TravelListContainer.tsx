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
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.TRAVEL.TRAVEL_LIST(InitialFilters),
    queryFn: () => getTravels({ ...InitialFilters }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TravelFilter />
      <TravelList />
    </HydrationBoundary>
  );
};

export default TravelListContainer;
