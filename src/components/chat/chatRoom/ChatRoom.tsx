import React, { useState, useEffect, useRef } from 'react';
import ChatMessages from '@/components/chat/chatRoom/ChatMessages';
import ChatInput from '@/components/chat/chatRoom/ChatInput';
import HamburgerMenu from '@/assets/menu.svg';
import Header from '@/components/common/header/Header';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChatOverview, ChatMessage } from '@/@types/chat';
import ChatSideBar from '@/components/chat/chatRoom/ChatSideBar';
import ChatAlbum from '@/components/chat/chatRoom/ChatAlbum';
import ChatImageViewer from '@/components/chat/chatRoom/ChatImageViewer';
import { useChat } from '@/hooks/useChat';
import { useChatOverview } from '@/hooks/useChatOverview';
import { useInView } from 'react-intersection-observer';
import useGetUser from '@/queries/user/useGetUser';
import ChatRoomSkeleton from '@/components/chat/skeleton/ChatRoomSkeleton';

interface Props {
  chatId: string;
  onCloseChatRoom: () => void;
}

const ChatRoom = ({ chatId, onCloseChatRoom }: Props) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [textareaHeight, setTextareaHeight] = useState(22);
  const messagesContainerRef = useRef<HTMLUListElement | null>(null);
  const previousScrollTopRef = useRef<number | null>(null);

  const { data: user } = useGetUser();
  const nickname = user?.nickname;

  const {
    chatOverview,
    currentGroup,
    currentImageIndex,
    groupedImages,
    isSidebarOpen,
    isAlbumOpen,
    isViewerOpen,
    handleOpenSidebar,
    handleCloseSidebar,
    handleOpenAlbum,
    handleCloseAlbum,
    handleOpenViewer,
    handleCloseViewer,
    setCurrentImageIndex,
    setCurrentGroup,
  } = useChatOverview(chatId);

  const {
    chatInfo,
    isFetchingNextPage,
    hasNextPage,
    error,
    isFetchingPreviousRef,
    fetchNextPage,
    handleSendMessage,
  } = useChat(chatId, nickname as string, 5);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      if (messagesContainerRef.current) {
        previousScrollTopRef.current =
          messagesContainerRef.current.scrollHeight -
          messagesContainerRef.current.scrollTop;
      }
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (messagesContainerRef.current && previousScrollTopRef.current !== null) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight -
        previousScrollTopRef.current;
    }
  }, [chatInfo]);

  if (error) {
    console.error('에러', { error });
    return (
      <div>
        데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.
        <p>{error.message}</p>
      </div>
    );
  }

  if (!chatInfo || !chatOverview) return <ChatRoomSkeleton />;

  return (
    <>
      <Header
        onRoute={onCloseChatRoom}
        title={
          <div className="flex items-center justify-center gap-1 truncate">
            <span className="truncate">{chatInfo?.chatTitle}</span>
            <span className="title-5-sb text-primary-normal">
              {chatOverview?.participants?.length}
            </span>
          </div>
        }
        isChatHeader
      >
        <button type="button" onClick={handleOpenSidebar}>
          <HamburgerMenu />
        </button>
      </Header>
      <ChatMessages
        isFetchingPreviousRef={isFetchingPreviousRef}
        messagesContainerRef={messagesContainerRef}
        messages={chatInfo?.chatMessages as ChatMessage[]}
        textareaHeight={textareaHeight}
        nickname={nickname as string}
      >
        {hasNextPage && !isFetchingNextPage ? <div ref={ref} /> : null}
      </ChatMessages>
      <ChatInput
        chatId={chatId}
        onSendMessage={handleSendMessage}
        onHeightChange={setTextareaHeight}
      />
      <ChatSideBar
        nickname={nickname as string}
        chatData={chatOverview as ChatOverview}
        isSidebarOpen={isSidebarOpen}
        onOpenAlbum={handleOpenAlbum}
        onCloseSidebar={handleCloseSidebar}
        onOpenViewer={handleOpenViewer}
      />
      <ChatAlbum
        groupedImages={groupedImages}
        isAlbumOpen={isAlbumOpen}
        onCloseAlbum={handleCloseAlbum}
        onOpenViewer={handleOpenViewer}
      />
      <ChatImageViewer
        isViewerOpen={isViewerOpen}
        groupedImages={groupedImages}
        currentImageIndex={currentImageIndex}
        currentGroup={currentGroup}
        onCloseViewer={handleCloseViewer}
        setCurrentImageIndex={setCurrentImageIndex}
        setCurrentGroup={setCurrentGroup}
      />
    </>
  );
};

export default ChatRoom;
