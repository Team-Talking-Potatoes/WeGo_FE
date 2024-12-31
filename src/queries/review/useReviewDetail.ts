import { getReviewDetail } from '@/api/reviewApi';
import { useQuery } from '@tanstack/react-query';

const useReviewDetail = (id: number) => {
  return useQuery({
    queryKey: ['review', 'detail', id],
    queryFn: () => getReviewDetail(id),
  });
};

export default useReviewDetail;
