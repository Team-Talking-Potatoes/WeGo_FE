'use client';

import { useState } from 'react';
import {
  useTravelParticipation,
  useTravelParticipationCancel,
} from '@/queries/travel/useTravelParticipation';
import ParticipantIcon from '@/assets/icon/travel/participant.svg';
import ModalErrorIcon from '@/assets/modal/modal_error.svg';
import useModal from '@/hooks/useModal';
import useDeleteTravel from '@/queries/travel/useDeleteTravel';
import { useRouter } from 'next/navigation';
import useGetUser from '@/queries/user/useGetUser';
import { Button } from '@/components/common/button/Button';

const TravelButtons = ({
  travelId,
  participationFlag,
  organizer,
  className,
}: {
  travelId: number;
  participationFlag: boolean | null;
  organizer?: number;
  className?: string;
}) => {
  const { data: userInfo } = useGetUser();
  const router = useRouter();

  const [isParticipate, setIsParticipate] = useState<boolean | null>(
    participationFlag,
  );
  const { showModal, closeModal } = useModal();
  const { mutate: handleParticipation } = useTravelParticipation();
  const { mutate: handleParticipationCancel } = useTravelParticipationCancel();
  const { mutate: handleDeleteTravel } = useDeleteTravel();

  const handleParticipationClick = () => {
    handleParticipation(travelId, {
      onSuccess: () => {
        setIsParticipate(true);
        showModal('동행이 확정되었습니다.', '이제 떠날 준비를 해 볼까요?', {
          titleHighlight: {
            range: { start: 4, end: 6 },
            color: 'text-primary-normal',
          },
          icon: ParticipantIcon,
          confirmText: '확인',
        });
      },
    });
  };

  const handleParticipationCancelClick = () => {
    showModal(
      '정말 동행을 취소할까요?',
      '해당 여행과 관련된 데이터는 전부 사라집니다.',
      {
        titleHighlight: {
          range: { start: 7, end: 9 },
          color: 'text-status-error',
        },
        icon: ModalErrorIcon,
        cancelText: '취소',
        confirmText: '확인',
        type: 'error',
        onConfirm: () => {
          handleParticipationCancel(travelId, {
            onSuccess: () => setIsParticipate(false),
          });
        },
        onCancel: () => {
          closeModal();
        },
      },
    );
  };

  const handleTravelCancel = () => {
    showModal(
      '정말 여행을 취소할까요?',
      '해당 여행과 관련된 데이터는 전부 사라집니다.',
      {
        cancelText: '취소',
        confirmText: '확인',
        type: 'error',
        onConfirm: () => {
          handleDeleteTravel(travelId, {
            onSuccess: () => router.back(),
          });
        },
        onCancel: () => {
          closeModal();
        },
      },
    );
  };

  return (
    <div
      className={`${className} mx-auto flex w-full max-w-[500px] md:col-span-2 md:mt-6 md:pb-3 xl:mb-0`}
    >
      <div className="flex w-full items-center justify-center gap-4 px-5">
        {organizer === (userInfo && userInfo.userId) && (
          <>
            <Button
              fill="white"
              label="여행취소"
              handler={handleTravelCancel}
              className="h-[52px] max-w-[242px]"
            />

            <Button label="공유" className="h-[52px] max-w-[242px]" />
          </>
        )}

        {isParticipate && organizer !== (userInfo && userInfo.userId) && (
          <Button
            fill="white"
            label="동행취소"
            handler={handleParticipationCancelClick}
            className="h-[52px] w-full max-w-[335px]"
          />
        )}
        {!isParticipate && (
          <Button
            fill="blue"
            label="동행"
            handler={handleParticipationClick}
            className="h-[52px] w-full max-w-[335px]"
          />
        )}
      </div>
    </div>
  );
};

export default TravelButtons;
