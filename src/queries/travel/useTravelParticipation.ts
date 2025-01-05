import { useMutation } from '@tanstack/react-query';
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
  const handleError = useQueryErrorHandler();
  return useMutation({
    mutationFn: postTravelParticipation,
    onError: (error: QueryError) => handleError(error),
  });
};

export const useTravelParticipationCancel = () => {
  const { showModal } = useModal();
  const handleError = useQueryErrorHandler();
  const router = useRouter();
  return useMutation({
    mutationFn: deleteTravelParticipation,
    onSuccess: () =>
      showModal('동행이 취소되었습니다.', '아쉬워요! 다른 여행을 찾아볼까요?', {
        icon: CheckRedIcon,
        confirmText: '확인',
        type: 'error',
        onConfirm: () => router.push('/travel'),
      }),
    onError: (error: QueryError) => handleError(error),
  });
};
