import { useMutation } from '@tanstack/react-query';
import { deleteTravel } from '@/api/travel/travels';

import { QueryError } from '@/@types/query';
import useModal from '@/hooks/useModal';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';

const useDeleteTravel = () => {
  const { showModal } = useModal();
  return useMutation({
    mutationFn: deleteTravel,
    onError: (error: QueryError) => {
      switch (error.status) {
        case 401:
          showModal('접근 권한이 없습니다.', '로그인이 필요합니다.', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
          });
          break;
        default:
          showModal('네트워크를 확인해주세요.', '여행 취소에 실패했습니다.', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
          });
          break;
      }
    },
  });
};

export default useDeleteTravel;
