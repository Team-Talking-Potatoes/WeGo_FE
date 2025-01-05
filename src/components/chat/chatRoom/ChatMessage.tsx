import React from 'react';
import Image from 'next/image';
import Remove from '@/assets/close_red.svg';
import Resend from '@/assets/resend.svg';
import { ChatMessage as ChatMessageType } from '@/@types/chat';
import { formatDateToKorean, formatTimeToKorean } from '@/utils/chat';
import UserIcon from '@/components/common/user/UserIcon';

interface Props {
  messages: ChatMessageType[];
  message: ChatMessageType;
  messageIndex: number;
  isError: boolean;
  textBoxHeights: Record<string, number>;
  messageRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  nickname: string;
}

const ChatMessage = ({
  messages,
  message,
  messageIndex,
  isError,
  textBoxHeights,
  messageRefs,
  nickname,
}: Props) => {
  const prevMessage = messages[messageIndex - 1];
  const nextMessage = messages[messageIndex + 1];

  const isNewDate =
    !prevMessage ||
    formatDateToKorean(prevMessage.createdAt) !==
      formatDateToKorean(message.createdAt);

  const isSameUser =
    prevMessage &&
    prevMessage.sender === message.sender &&
    prevMessage.createdAt === message.createdAt;

  const isLastInGroup =
    !nextMessage ||
    nextMessage.sender !== message.sender ||
    nextMessage.createdAt !== message.createdAt;

  const textBoxHeight = textBoxHeights[message.chatMessageId] || 0;

  const getMessageGridStyles = (imagesLength: number) => {
    if (imagesLength === 1)
      return 'h-[180px] w-[200px] grid-cols-2 grid-rows-1';
    if (imagesLength === 2)
      return 'h-[144px] w-[218px] grid-cols-4 grid-rows-1';
    if (imagesLength <= 4) return 'h-[144px] w-[218px] grid-cols-4 grid-rows-2';
    if (imagesLength > 6) return 'h-[218px] w-[218px] grid-cols-6 grid-rows-3';
    return 'h-[144px] w-[218px] grid-cols-6 grid-rows-2';
  };

  const getColSpan = (imagesLength: number, msgIdx: number) => {
    if (imagesLength === 3 && msgIdx === 2) {
      return 'col-span-4';
    }
    if (
      (imagesLength === 5 && msgIdx >= 3) ||
      (imagesLength === 8 && msgIdx >= 6)
    ) {
      return 'col-span-3';
    }
    if (imagesLength === 7 && msgIdx === 6) {
      return 'col-span-6';
    }
    return '';
  };

  const isMine = message.sender === nickname;
  return (
    <>
      {isNewDate && (
        <div className="mb-8 flex items-center gap-2.5">
          <div className="h-[1px] flex-1 bg-line-normal" />
          <div className="body-3-m text-label-neutral">
            {formatDateToKorean(message.createdAt)}
          </div>
          <div className="h-[1px] flex-1 bg-line-normal" />
        </div>
      )}
      <div
        className={`flex flex-col ${
          isLastInGroup ? 'mb-4' : 'mb-2'
        } ${isMine ? 'items-end' : 'items-start'}`}
      >
        {!isSameUser && !isMine && (
          <div className="flex">
            <UserIcon
              size="xs"
              profileImage={message.senderProfileImage}
              nickname={message.sender}
              ariaLabel={`${message.sender ?? '유저'}의 프로필 이미지`}
            />
            <div className="caption-1-sb ml-[7px] text-label-neutral">
              {message.sender}
            </div>
          </div>
        )}
        <div className="flex items-end">
          <div
            className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} ${isMine ? 'order-2 ml-[5px]' : 'order-1 ml-[30px] mr-[5px]'}`}
          >
            {message.images.length !== 0 && (
              <div
                className={`${message.content && 'mb-2'} grid gap-2 ${getMessageGridStyles(message.images.length)}`}
              >
                {message.images.map((image, msgIdx) => (
                  <div
                    key={image}
                    className={`relative col-span-2 ${getColSpan(message.images.length, msgIdx)}`}
                  >
                    <Image
                      src={image}
                      alt={`${message.sender} 업로드 이미지 ${msgIdx + 1}`}
                      fill
                      className={`${message.images.length === 1 ? 'rounded-lg' : 'rounded'} object-cover`}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-end">
              {message.content !== '' && (
                <>
                  <div
                    ref={(el) => {
                      if (messageRefs.current) {
                        const refs = messageRefs.current;
                        refs[message.chatMessageId] = el;
                      }
                    }}
                    className={`body-3-r w-fit max-w-[255px] break-words ${
                      isMine
                        ? 'order-2 ml-[5px] bg-primary-normal text-primary-white'
                        : 'order-1 mr-[5px] bg-gray-200 text-label-neutral'
                    } ${textBoxHeight > 30 ? 'rounded-2xl' : 'rounded-[30px]'} px-2.5 py-1.5`}
                  >
                    {message.content}
                  </div>

                  <div
                    className={`relative ${isMine ? 'order-1' : 'order-2'} ${isError && 'flex gap-1.5 rounded-md border border-gray-200 px-[5px] py-1'}`}
                  >
                    {isError ? (
                      <>
                        <button type="button" onClick={() => {}}>
                          <Resend />
                        </button>
                        <button type="button" onClick={() => {}}>
                          <Remove />
                        </button>
                      </>
                    ) : (
                      <>
                        <div
                          className={`caption-1-sb absolute ${
                            isLastInGroup ? 'bottom-[14px]' : 'bottom-0'
                          } text-label-neutral ${isMine ? 'right-0' : 'left-0'}`}
                        >
                          {/* {message.unreadCount} */}
                        </div>
                        {isLastInGroup && (
                          <div className="caption-1-r whitespace-nowrap text-label-alternative">
                            {formatTimeToKorean(message.createdAt)}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          {message.content === '' && (
            <div
              className={`relative ${isMine ? 'order-1' : 'order-2'} ${isError && 'flex gap-1.5 rounded-md border border-gray-200 px-[5px] py-1'}`}
            >
              {isError ? (
                <>
                  <button type="button" onClick={() => {}}>
                    <Resend />
                  </button>
                  <button type="button" onClick={() => {}}>
                    <Remove />
                  </button>
                </>
              ) : (
                <>
                  <div
                    className={`caption-1-sb absolute ${
                      isLastInGroup ? 'bottom-[14px]' : 'bottom-0'
                    } text-label-neutral ${isMine ? 'right-0' : 'left-0'}`}
                  >
                    {/* {message.unreadCount} */}
                  </div>
                  {isLastInGroup && (
                    <div className="caption-1-r whitespace-nowrap text-label-alternative">
                      {formatTimeToKorean(message.createdAt)}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
// 언리드 주석
