import { getPopularTravel } from '@/api/travelApi';
import { QUERY_KEYS } from '@/constants/querykeys';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import WeeklyPopular from './WeeklyPopular';

const WeeklyPopularContainer = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.TRAVEL.POPULAR_TRAVEL,
    queryFn: getPopularTravel,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeeklyPopular />
    </HydrationBoundary>
  );
};
export default WeeklyPopularContainer;
