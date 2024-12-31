import { useMutation } from '@tanstack/react-query';
import { QueryError } from '@/@types/query';
import useModal from '@/hooks/useModal';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';
import { deleteTravelBookMark, postTravelBookMark } from '@/api/travel/travels';

export const useBookmarkTravel = () => {
  const { showModal } = useModal();
  return useMutation({
    mutationFn: postTravelBookMark,
    onError: (error: QueryError) => {
      switch (error.status) {
        case 401:
          showModal('접근 권한이 없습니다.', '로그인이 필요합니다.', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
          });
          break;
        default:
          showModal('네트워크를 확인해주세요.', '', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
          });
          break;
      }
    },
  });
};

export const useDeleteBookmarkTravel = () => {
  const { showModal } = useModal();
  return useMutation({
    mutationFn: deleteTravelBookMark,
    onError: (error: QueryError) => {
      switch (error.status) {
        case 401:
          showModal('접근 권한이 없습니다.', '로그인이 필요합니다.', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
          });
          break;
        default:
          showModal('네트워크를 확인해주세요.', '', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
          });
          break;
      }
    },
  });
};
