import { getPopularReview } from '@/api/review/review';
import { QUERY_KEYS } from '@/constants/querykeys';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import WeeklyReview from './WeeklyReview';

const WeeklyReviewContainer = async () => {
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery({
    queryKey: QUERY_KEYS.REVIEW.POPULAR_REVIEW,
    queryFn: getPopularReview,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeeklyReview reviewList={data.data} />
    </HydrationBoundary>
  );
};

export default WeeklyReviewContainer;
