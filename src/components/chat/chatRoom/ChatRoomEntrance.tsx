import Header from '@/components/common/header/Header';
import Image from 'next/image';
import { RoomResponse } from '@/@types/chat';
import { Button } from '@/components/common/button/Button';
import { useSetIsJoined } from '@/queries/chat/useSetChat';
import UserIcon from '@/components/common/user/UserIcon';

interface Props {
  chatId: string;
  chatRoomData: RoomResponse;
  onCloseChatRoom: () => void;
}

const ChatRoomEntrance = ({ chatId, chatRoomData, onCloseChatRoom }: Props) => {
  const { mutate } = useSetIsJoined();

  const handleJoinChat = () => {
    mutate({ chatId });
  };

  const {
    image,
    chattingName,
    description,
    host,
    hostProfileImage,
    totalMembersCount,
    membersCount,
  } = chatRoomData;

  return (
    <>
      <Header onRoute={onCloseChatRoom} title="채팅" isChatHeader />

      <div className="mb-[120px] mt-[100px] flex h-full flex-1 flex-col items-center text-center xl:mt-[calc(60px+18%)]">
        <div className="relative mb-6 h-[100px] w-[100px] overflow-hidden rounded-full">
          <Image
            src={image}
            alt={chattingName}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h2 className="title-4-b mb-1 text-label-normal">{chattingName}</h2>
        <p className="body-2-r mb-6 text-label-alternative">{description}</p>
        <div className="flex">
          <UserIcon
            size="xs"
            profileImage={hostProfileImage}
            nickname={host}
            ariaLabel={`${host ?? '유저'}의 프로필 이미지`}
          />
          <span className="body-2-b ml-[7px] text-label-neutral after:mx-2 after:text-line-normal after:content-['|']">
            {host}
          </span>
          <span className="body-2-m text-label-alternative">
            {membersCount}/{totalMembersCount}명
          </span>
        </div>
        <Button
          handler={handleJoinChat}
          fill="blue"
          className="mt-auto xl:mt-[120px]"
        >
          채팅방 참여하기
        </Button>
      </div>
    </>
  );
};

export default ChatRoomEntrance;
