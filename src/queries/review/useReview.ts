import { ReviewListFilters } from '@/@types/review';
import { getReview } from '@/api/review/review';
import { useInfiniteQuery } from '@tanstack/react-query';

const useReview = ({ sortOrder }: ReviewListFilters) => {
  return useInfiniteQuery({
    queryKey: ['review', 'listPage', sortOrder],
    queryFn: ({ pageParam }) => getReview({ pageParam, sortOrder }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.hasNext ? pages.length + 1 : undefined;
    },
  });
};

export default useReview;
