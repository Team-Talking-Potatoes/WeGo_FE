import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getTravels } from '@/api/travelApi';
import TravelFilter from './TravelFilter';
import TravelList from './TravelList';

const TravelListContainer = async () => {
  const initial = {
    startAt: '',
    endAt: '',
    isDomestic: null,
    sortOrder: null,
    searchText: '',
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['travels', initial],
    queryFn: () => getTravels({ ...initial }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TravelFilter />
      <TravelList />
    </HydrationBoundary>
  );
};

export default TravelListContainer;
