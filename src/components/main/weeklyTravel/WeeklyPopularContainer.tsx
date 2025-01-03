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

  try {
    const data = await queryClient.fetchQuery({
      queryKey: QUERY_KEYS.TRAVEL.POPULAR_TRAVEL,
      queryFn: getPopularTravel,
      staleTime: 60 * 1000,
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WeeklyPopular travelList={data.data} />
      </HydrationBoundary>
    );
  } finally {
    queryClient.clear();
  }
};
export default WeeklyPopularContainer;
