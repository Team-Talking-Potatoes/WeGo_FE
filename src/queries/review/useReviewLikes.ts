import { deleteReviewLike, postReviewLike } from '@/api/review/review';
import { useMutation } from '@tanstack/react-query';
import { QueryError } from '@/@types/query';
import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';

interface ReviewLikesParams {
  id: number;
  method: 'post' | 'delete';
  onSuccessCallback: () => void;
}

export const useReviewLikes = ({
  id,
  method,
  onSuccessCallback,
}: ReviewLikesParams) => {
  const router = useRouter();
  const { showModal } = useModal();

  return useMutation({
    mutationFn:
      method === 'post' ? () => postReviewLike(id) : () => deleteReviewLike(id),
    onSuccess: () => {
      onSuccessCallback();
    },
    onError: (error: QueryError) => {
      switch (error.status) {
        case 400:
          showModal('로그인이 필요합니다.', '로그인 후 이용해주세요.', {
            icon: ModalErrorIcon,
            confirmText: '돌아가기',
            cancelText: '로그인',
            onCancel: () => {
              router.push('/login');
            },
          });
          break;
        default:
          break;
      }
    },
  });
};
