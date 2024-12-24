import { getPopularReview } from '@/api/reviewApi';
import { QUERY_KEYS } from '@/constants/querykeys';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import WeeklyReview from './WeeklyReview';

const WeeklyReviewContainer = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.REVIEW.POPULAR_REVIEW,
    queryFn: getPopularReview,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeeklyReview />
    </HydrationBoundary>
  );
};

export default WeeklyReviewContainer;
