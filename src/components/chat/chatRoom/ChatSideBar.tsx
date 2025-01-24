import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Group from '@/assets/group.svg';
import Right from '@/assets/right_gray.svg';
import Leaveout from '@/assets/leaveout.svg';
import { ChatOverview, ImageInfo, Participant } from '@/@types/chat';
import { v4 as uuidv4 } from 'uuid';
import UserProfileModal from '@/components/user/userProfileModal/UserProfileModal';
import UserIcon from '@/components/common/user/UserIcon';
import { useWebSocketStore } from '@/store/useWebSocketStore';

interface Props {
  chatData: ChatOverview;
  isSidebarOpen: boolean;
  nickname: string;
  onOpenAlbum: () => void;
  onCloseSidebar: () => void;
  onOpenViewer: (image: ImageInfo) => void;
}

const ChatSideBar = ({
  chatData,
  isSidebarOpen,
  nickname,
  onOpenAlbum,
  onCloseSidebar,
  onOpenViewer,
}: Props) => {
  const { chatUpdates } = useWebSocketStore();
  const [participants, setParticipants] = useState<Participant[]>(
    chatData.participants ?? [],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);

  const handleCloseProfileModal = () => {
    setIsOpen(false);
    setSelectedParticipant(null); // 모달 닫을 때 선택된 참여자 정보 초기화
  };

  const handleOpenProfileModal = (participant: Participant) => {
    setSelectedParticipant(participant); // 선택된 참여자 정보 설정
    setIsOpen(true); // 모달 열기
  };

  useEffect(() => {
    Object.values(chatUpdates).forEach((update) => {
      if (
        update.status === 'JOIN' &&
        update.participant &&
        !participants.some((p) => p.nickname === update.participant?.nickname)
      ) {
        setParticipants((prev) => [...prev, update.participant!]);
      }
    });
  }, [chatUpdates, participants]);
  return (
    <>
      <div
        className={`absolute right-0 top-0 z-20 w-[296px] bg-white shadow-lg transition duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-[calc(100vh-80px)] flex-col gap-5 px-4 py-5 md:h-[calc(100vh-160px)]">
          <h2 className="title-5-b text-label-normal">채팅방 모아보기</h2>
          <div>
            <header className="mb-2 flex items-center justify-between">
              <h3 className="body-2-m text-label-normal">이미지</h3>
              <button type="button" onClick={onOpenAlbum}>
                <Right />
              </button>
            </header>
            <ul className="flex gap-2">
              {chatData.album
                ?.sort(
                  (a, b) =>
                    new Date(b.uploadDate).getTime() -
                    new Date(a.uploadDate).getTime(),
                )
                .map((img, index) =>
                  index < 4 && img.images.length !== 0 ? (
                    <li key={uuidv4()}>
                      <button
                        type="button"
                        className="relative h-[60px] w-[60px] cursor-pointer"
                        onClick={() => onOpenViewer(img)}
                      >
                        <Image
                          src={img.images[0]}
                          alt={`${img.uploader} 업로드 이미지`}
                          fill
                          className="rounded object-cover"
                        />
                        {img.images.length > 1 && (
                          <Group className="absolute bottom-1.5 right-1.5" />
                        )}
                      </button>
                    </li>
                  ) : null,
                )}
            </ul>
          </div>
          <div className="h-[1px] bg-line-normal" />
          <h2 className="title-5-b text-label-normal">참여자</h2>
          <ul className="flex flex-1 flex-col gap-4 overflow-y-auto custom-scrollbar">
            {participants.map((participant) => (
              <button
                type="button"
                key={uuidv4()}
                className="flex cursor-pointer items-center gap-2.5 transition-all duration-300 hover:bg-gray-100"
                onClick={() => handleOpenProfileModal(participant)} // 참여자 클릭 시 모달 열기
              >
                <div className="relative shrink-0">
                  <UserIcon
                    size="md"
                    profileImage={participant.profileImage}
                    nickname={participant.nickname}
                    ariaLabel={`${participant.nickname ?? '유저'}의 프로필 이미지`}
                  />
                  {nickname === participant.nickname && (
                    <div className="caption-1-sb absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white">
                      ME
                    </div>
                  )}
                </div>
                <div
                  className={`${nickname === participant.nickname ? 'body-2-sb' : 'body-2-r'} truncate text-label-normal`}
                >
                  {participant.nickname}
                </div>
              </button>
            ))}
          </ul>
        </div>
        <div className="h-20 border border-line-normal bg-background-alternative px-4 pb-8 pt-4">
          <button type="button" onClick={onCloseSidebar}>
            <Leaveout />
          </button>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="absolute inset-0 z-10 bg-label-strong/40"
          role="button"
          tabIndex={0}
          onClick={onCloseSidebar}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter') {
              onCloseSidebar();
            }
          }}
          aria-label="Close Sidebar"
        />
      )}
      {selectedParticipant && (
        <UserProfileModal
          isOpen={isOpen}
          onClose={handleCloseProfileModal}
          participant={selectedParticipant}
        />
      )}
    </>
  );
};

export default ChatSideBar;
