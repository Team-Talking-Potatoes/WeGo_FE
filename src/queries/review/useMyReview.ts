import { getMyReview } from '@/api/reviewApi';
import { useQuery } from '@tanstack/react-query';

const useMyReview = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['myReview', limit, offset],
    queryFn: () => getMyReview(limit, offset),
  });
};

export default useMyReview;
