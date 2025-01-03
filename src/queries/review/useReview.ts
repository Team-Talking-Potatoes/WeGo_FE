import { Filters } from '@/@types/review';
import { getReview } from '@/api/review/review';
import { useInfiniteQuery } from '@tanstack/react-query';

const useReview = ({ sortOrder }: Filters) => {
  return useInfiniteQuery({
    queryKey: ['review', 'listPage', sortOrder],
    queryFn: ({ pageParam }) => getReview({ pageParam, sortOrder }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.hasNext ? pages.length + 1 : undefined;
    },
  });
};

export default useReview;
