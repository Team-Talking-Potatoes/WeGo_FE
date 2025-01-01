import { useMutation } from '@tanstack/react-query';
import { QueryError } from '@/@types/query';
import { deleteTravelBookMark, postTravelBookMark } from '@/api/travel/travels';
import { useQueryErrorHandler } from '../common/errorHandler';

export const useBookmarkTravel = () => {
  const handleError = useQueryErrorHandler();
  return useMutation({
    mutationFn: postTravelBookMark,
    onError: (error: QueryError) => handleError(error),
  });
};

export const useDeleteBookmarkTravel = () => {
  const handleError = useQueryErrorHandler();
  return useMutation({
    mutationFn: deleteTravelBookMark,
    onError: (error: QueryError) => handleError(error),
  });
};
