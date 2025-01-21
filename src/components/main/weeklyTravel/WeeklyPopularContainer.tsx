import { getPopularTravel } from '@/api/travel/travels';
import { QUERY_KEYS } from '@/constants/querykeys';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import WeeklyPopular from './WeeklyPopular';

const WeeklyPopularContainer = async () => {
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery({
    queryKey: QUERY_KEYS.TRAVEL.POPULAR_TRAVEL,
    queryFn: getPopularTravel,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeeklyPopular travelList={data.data} />
    </HydrationBoundary>
  );
};
export default WeeklyPopularContainer;
