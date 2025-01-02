'use client';

import { Button } from '@/components/common/button/Button';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import Close from '@/assets/close_sm_20px.svg';
import { Participant } from '@/@types/chat';
import UserIcon from '@/components/common/user/UserIcon';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  participant: Participant;
}

const ProfileModal = ({ isOpen, onClose, participant }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-label-strong/40"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="flex min-w-[343px] flex-col rounded-lg bg-white px-6 pb-6 pt-8">
          <div className="flex items-center justify-between">
            <h2 className="title-4-b text-label-normal">프로필 보기</h2>
            <button type="button" onClick={onClose}>
              <Close />
            </button>
          </div>

          <div className="mb-6 mt-4 h-px w-full bg-line-normal" />

          <div className="flex flex-col items-center text-center">
            <UserIcon
              size="lg"
              profileImage={participant.profileImage}
              nickname={participant.user}
              ariaLabel={`${participant.user ?? '유저'}의 프로필 이미지`}
            />
            <h2 className="title-5-b mt-6 text-label-strong">
              {participant.user}
            </h2>
            <p className="body-3-r mb-4 text-label-alternative">
              {participant.email}
            </p>

            <p className="body-2-sb text-label-neutral">
              {participant.description}
            </p>
          </div>

          <div className="my-4 h-px bg-label-assistive" />

          <div className="mb-10 flex items-center justify-between rounded bg-gray-100 px-5 py-2.5">
            <span className="body-2-m text-label-neutral">생성한 여행모임</span>
            <span className="heading-1-sb text-label-normal">
              {participant.travelCount}
            </span>
          </div>

          <Button className="mx-auto h-[38px] w-[120px]" handler={onClose}>
            확인
          </Button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ProfileModal;
