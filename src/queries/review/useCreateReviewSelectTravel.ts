import { getWritableTravelReview } from '@/api/review/createReview';
import { QUERY_KEYS } from '@/constants/querykeys';
import { useInfiniteQuery } from '@tanstack/react-query';

const useCreateReviewSelectTravel = () => {
  const size = 8;
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.REVIEW.CREATE_REVIEW_SELECT_TRAVEL(size),
    queryFn: ({ pageParam = 0 }) => getWritableTravelReview(size, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNext ? pages.length + 1 : undefined;
    },
    staleTime: Infinity,
  });
};

export default useCreateReviewSelectTravel;
