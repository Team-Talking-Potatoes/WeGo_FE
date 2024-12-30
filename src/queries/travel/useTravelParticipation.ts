import { useMutation } from '@tanstack/react-query';
import { deleteTravelParticipation } from '@/api/travel/travels';
import CheckRedIcon from '@/assets/modal/modal_check_red.svg';
import { QueryError } from '@/@types/query';
import useModal from '@/hooks/useModal';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';
import { useRouter } from 'next/navigation';

export const useTravelParticipation = () => {
  const { showModal } = useModal();
  return useMutation({
    mutationFn: deleteTravelParticipation,
    onError: (error: QueryError) => {
      switch (error.status) {
        case 401:
          showModal('접근 권한이 없습니다.', '로그인이 필요합니다.', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
          });
          break;
        default:
          showModal('네트워크를 확인해주세요.', '여행 참여에 실패했습니다.', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
          });
          break;
      }
    },
  });
};

export const useTravelParticipationCancle = () => {
  const { showModal } = useModal();
  const router = useRouter();
  return useMutation({
    mutationFn: deleteTravelParticipation,
    onSuccess: () =>
      showModal('동행이 취소되었습니다.', '아쉬워요! 다른 여행을 찾아볼까요?', {
        icon: CheckRedIcon,
        confirmText: '확인',
        onConfirm: () => router.push('/travel'),
      }),
    onError: (error: QueryError) => {
      switch (error.status) {
        case 401:
          showModal('접근 권한이 없습니다.', '로그인이 필요합니다.', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
          });
          break;
        default:
          showModal(
            '네트워크를 확인해주세요.',
            '여행 참여 취소를 실패했습니다.',
            {
              icon: ModalErrorIcon,
              confirmText: '돌아가기',
            },
          );
          break;
      }
    },
  });
};
