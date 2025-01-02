import { getReviewDetail } from '@/api/review/review';
import { useQuery } from '@tanstack/react-query';

const useReviewDetail = (id: number) => {
  return useQuery({
    queryKey: ['review', 'detail', id],
    queryFn: () => getReviewDetail(id),
  });
};

export default useReviewDetail;
