import { getTravelReviewRate } from '@/api/review/review';
import { QUERY_KEYS } from '@/constants/querykeys';
import { useQuery } from '@tanstack/react-query';

const useGetTravelReviewRating = ({ travelId }: { travelId: number }) => {
  return useQuery({
    queryKey: QUERY_KEYS.TRAVEL.TRAVEL_DETAIL_REVIEW_RATING(travelId),
    queryFn: () => getTravelReviewRate({ travelId }),
  });
};
export default useGetTravelReviewRating;
