import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryError } from '@/@types/query';
import { deleteTravelBookMark, postTravelBookMark } from '@/api/travel/travels';
import { useQueryErrorHandler } from '../common/errorHandler';

export const useBookmarkTravel = () => {
  const queryClient = useQueryClient();
  const handleError = useQueryErrorHandler();

  return useMutation({
    mutationFn: postTravelBookMark,
    onError: (error: QueryError) => handleError(error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkedTravel'] });
    },
  });
};

export const useDeleteBookmarkTravel = () => {
  const queryClient = useQueryClient();
  const handleError = useQueryErrorHandler();

  return useMutation({
    mutationFn: deleteTravelBookMark,
    onError: (error: QueryError) => handleError(error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkedTravel'] });
    },
  });
};
