import { getTravelReview } from '@/api/review/review';
import { QUERY_KEYS } from '@/constants/querykeys';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetTravelReview = ({ travelId }: { travelId: number }) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.TRAVEL.TRAVEL_DETAIL_REVIEW(travelId),
    queryFn: ({ pageParam = 0 }) => getTravelReview({ travelId, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.hasNext ? pages.length : undefined;
    },
    staleTime: Infinity,
  });
};

export default useGetTravelReview;
