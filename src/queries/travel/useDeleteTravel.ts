import { useMutation } from '@tanstack/react-query';
import { deleteTravel } from '@/api/travel/travels';
import { QueryError } from '@/@types/query';
import { useQueryErrorHandler } from '../common/errorHandler';

const useDeleteTravel = () => {
  const handleError = useQueryErrorHandler();
  return useMutation({
    mutationFn: deleteTravel,
    onError: (error: QueryError) => handleError(error),
  });
};

export default useDeleteTravel;
