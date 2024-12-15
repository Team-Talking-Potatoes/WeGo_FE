import { Filters } from '@/@types/review';
import { getReview } from '@/api/reviewApi';
import { useInfiniteQuery } from '@tanstack/react-query';

const useReview = ({ sortOrder }: Filters) => {
  return useInfiniteQuery({
    queryKey: ['review', 'listPage', sortOrder],
    queryFn: ({ pageParam }) => getReview({ pageParam, sortOrder }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return !lastPage.isLast ? pages.length + 1 : undefined;
    },
  });
};

export default useReview;
