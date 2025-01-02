/* eslint-disable no-param-reassign */
import { useEffect, useRef, useState } from 'react';
import Chat from '@/assets/chat_gray.svg';
import { ChatMessage as ChatMessageType } from '@/@types/chat';
import ChatMessage from '@/components/chat/chatRoom/ChatMessage';

interface Props {
  isFetchingPreviousRef: React.MutableRefObject<boolean>;
  messages: ChatMessageType[];
  textareaHeight: number;
  children: React.ReactNode;
  messagesContainerRef: React.RefObject<HTMLUListElement>;
  nickname: string;
}

const ChatMessages = ({
  isFetchingPreviousRef,
  messages,
  textareaHeight,
  children,
  messagesContainerRef,
  nickname,
}: Props) => {
  const [isError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [textBoxHeights, setTextBoxHeights] = useState<Record<string, number>>(
    {},
  );

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const updateTextBoxHeights = () => {
    const heights: Record<string, number> = {};
    Object.keys(messageRefs.current).forEach((id) => {
      const element = messageRefs.current[id];
      if (element) {
        heights[id] = element.clientHeight;
      }
    });
    setTextBoxHeights(heights);
  };

  useEffect(() => {
    updateTextBoxHeights();

    window.addEventListener('resize', updateTextBoxHeights);
    return () => {
      window.removeEventListener('resize', updateTextBoxHeights);
    };
  }, [messages]);

  useEffect(() => {
    if (!isFetchingPreviousRef.current) {
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
    isFetchingPreviousRef.current = false;
  }, [messages, textareaHeight, isFetchingPreviousRef]);

  const isMdScreen = window.matchMedia('(min-width: 768px)').matches;
  const height = isMdScreen
    ? `calc(100vh - ${textareaHeight + 190}px)`
    : `calc(100vh - ${textareaHeight + 110}px)`;

  if (messages.length === 0) {
    return (
      <div className="mt-[60px] flex h-[calc(100vh-140px)] flex-col items-center justify-center md:mt-[180px] md:justify-start xl:mt-[300px]">
        <Chat className="mb-4" />
        <p className="body-1-m text-center text-label-alternative">
          채팅이 시작 되었습니다!
          <br />
          여행에 대해 활발하게 의견을 나눠보세요 :)
        </p>
      </div>
    );
  }

  return (
    <ul
      ref={messagesContainerRef}
      className="mt-[60px] overflow-y-auto p-5 custom-scrollbar"
      style={{
        height,
      }}
    >
      {children}
      {messages.map((msg, index) => (
        <li key={msg.chatMessageId}>
          <ChatMessage
            messages={messages}
            message={msg}
            messageIndex={index}
            isError={isError}
            textBoxHeights={textBoxHeights}
            messageRefs={messageRefs}
            nickname={nickname}
          />
        </li>
      ))}
      <div ref={messagesEndRef} />
    </ul>
  );
};

export default ChatMessages;

/**
 

 */
