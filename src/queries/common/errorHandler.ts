import { APIError } from '@/@types/api';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';
import { ERROR_CODES } from '@/constants/errorCodes';
import useModal from '@/hooks/useModal';

export const useQueryErrorHandler = () => {
  const { showModal } = useModal();

  const handleQueryError = (error: APIError) => {
    console.error('Error fetching data:', error.message);

    const modalContent = {
      title: '',
      message: '',
      icon: ModalErrorIcon,
      confirmText: '돌아가기',
    };

    switch (error.status) {
      case ERROR_CODES.UNAUTHORIZED:
      case ERROR_CODES.FORBIDDEN:
        modalContent.title = '접근 권한이 없습니다.';
        modalContent.message = '로그인이 필요합니다.';
        break;

      case ERROR_CODES.NOT_FOUND:
        modalContent.title = '요청한 자원을 찾을 수 없습니다.';
        modalContent.message = '리소스가 존재하지 않습니다.';
        break;

      case ERROR_CODES.BAD_REQUEST:
        modalContent.title = '잘못된 요청입니다.';
        modalContent.message = '요청의 형식에 문제가 있습니다.';
        break;

      case ERROR_CODES.SERVER_ERROR:
      case ERROR_CODES.BAD_GATEWAY:
      case ERROR_CODES.SERVICE_UNAVAILABLE:
      case ERROR_CODES.GATEWAY_TIMEOUT:
        modalContent.title = '서버 오류';
        modalContent.message =
          '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
        break;

      default:
        modalContent.title = '예기치 못한 오류';
        modalContent.message = '알 수 없는 오류가 발생했습니다.';
        break;
    }

    showModal(modalContent.title, modalContent.message, {
      icon: ModalErrorIcon,
      confirmText: modalContent.confirmText,
      type: 'error',
    });
  };

  return handleQueryError;
};
