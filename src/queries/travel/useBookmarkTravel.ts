import { useMutation } from '@tanstack/react-query';
import { bookmarkTravel } from '@/api/travel/myTravelApi';
import { QueryError } from '@/@types/query';
import useModal from '@/hooks/useModal';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';

const useBookmarkTravel = () => {
  const { showModal } = useModal();
  return useMutation({
    mutationFn: bookmarkTravel,
    onError: (error: QueryError) => {
      switch (error.status) {
        case 401:
          showModal('접근 권한이 없습니다.', '로그인이 필요합니다.', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
          });
          break;
        default:
          showModal('네트워크를 확인해주세요.', '북마크 실패했습니다.', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
          });
          break;
      }
    },
  });
};

export default useBookmarkTravel;
