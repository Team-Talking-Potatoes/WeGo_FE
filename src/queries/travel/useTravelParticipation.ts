import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteTravelParticipation,
  postTravelParticipation,
} from '@/api/travel/travels';
import CheckRedIcon from '@/assets/modal/modal_check_red.svg';
import { QueryError } from '@/@types/query';
import useModal from '@/hooks/useModal';
import { useRouter } from 'next/navigation';
import { useQueryErrorHandler } from '../common/errorHandler';

export const useTravelParticipation = () => {
  const queryClient = useQueryClient();
  const handleError = useQueryErrorHandler();
  return useMutation({
    mutationFn: postTravelParticipation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travels'] });
      queryClient.invalidateQueries({ queryKey: ['upcommingTravel'] });
    },
    onError: (error: QueryError) => handleError(error),
  });
};

export const useTravelParticipationCancel = () => {
  const queryClient = useQueryClient();
  const { showModal } = useModal();
  const handleError = useQueryErrorHandler();
  const router = useRouter();
  return useMutation({
    mutationFn: deleteTravelParticipation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travels'] });
      queryClient.invalidateQueries({ queryKey: ['upcommingTravel'] });
      showModal('동행이 취소되었습니다.', '아쉬워요! 다른 여행을 찾아볼까요?', {
        icon: CheckRedIcon,
        confirmText: '확인',
        type: 'error',
        onConfirm: () => router.refresh(),
      });
    },
    onError: (error: QueryError) => handleError(error),
  });
};
