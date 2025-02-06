import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTravel } from '@/api/travel/createTravel';
import { QueryError } from '@/@types/query';
import useModal from '@/hooks/useModal';
import ModalTravelSuccessIcon from '@/assets/modal/modal_travel_success.svg';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';
import { useRouter } from 'next/navigation';
import { clearIndexedDB } from '@/utils/travelIndexedDB';
import useGetUser from '@/queries/user/useGetUser';

const useCreateTravel = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showModal } = useModal();
  const { data: user } = useGetUser();

  return useMutation({
    mutationFn: createTravel,
    onError: (error: QueryError) => {
      switch (error.status) {
        case 400:
          showModal(
            '잘못된 형식의 입력입니다.',
            '여행 만들기에 실패했습니다.',
            {
              icon: ModalErrorIcon,
              type: 'error',
              onConfirm: () => {
                router.push('/');
              },
            },
          );
          break;
        case 500:
          showModal('네트워크를 확인해주세요.', `${error.message}`, {
            icon: ModalErrorIcon,
            onConfirm: () => {
              router.push('/');
            },
          });
          break;
        default:
          showModal('알 수 없는 오류 발생했습니다.', `${error.message}`, {
            icon: ModalErrorIcon,
            onConfirm: () => {
              router.push('/');
            },
          });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['upcommingTravel'] });
      queryClient.invalidateQueries({ queryKey: ['travels'] });

      if (user) {
        const { nickname } = user;
        showModal(
          `${nickname} 님의\n여행모임이 생성 되었습니다!`,
          '이제 함께 떠나는 여행을 시작해요.',
          {
            icon: ModalTravelSuccessIcon,
            confirmText: '확인',
            onConfirm: async () => {
              try {
                await clearIndexedDB();
              } finally {
                router.push('/travel');
              }
            },
          },
        );
      }
    },
  });
};

export default useCreateTravel;
