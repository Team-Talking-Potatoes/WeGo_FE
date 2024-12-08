import { useMutation } from '@tanstack/react-query';
import { checkPassword } from '@/api/auth/deleteAccountApi';
import { QueryError } from '@/@types/query';
import useModal from '@/hooks/useModal';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';

const useCheckPassword = (onSuccessCallback: () => void) => {
  const { showModal } = useModal();

  return useMutation({
    mutationFn: checkPassword,
    onError: (error: QueryError) => {
      switch (error.status) {
        case 401:
          showModal('잘못된 비밀번호입니다.', '비밀번호를 확인해주세요.', {
            icon: ModalErrorIcon,
          });
          break;
        default:
          showModal('네트워크를 확인해주세요.', '회원탈퇴에 실패했습니다.', {
            icon: ModalErrorIcon,
          });
      }
    },
    onSuccess: () => {
      onSuccessCallback();
    },
  });
};

export default useCheckPassword;
