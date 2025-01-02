import { useGetChatOverview } from '@/queries/chat/useGetChat';
import { useState, useEffect } from 'react';
import { ImageInfo, ChatOverview } from '@/@types/chat';

export const useChatOverview = (chatId: string) => {
  const { data } = useGetChatOverview(chatId);
  const [chatOverview, setChatOverview] = useState<ChatOverview | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const [currentGroup, setCurrentGroup] = useState<ImageInfo | null>(null); // ImageInfo
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // ImageInfo 내 이미지 배열의 인덱스

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleOpenAlbum = () => {
    setIsAlbumOpen(true);
  };

  const handleCloseAlbum = () => {
    setIsAlbumOpen(false);
  };

  const handleOpenViewer = (group: ImageInfo) => {
    setCurrentGroup(group);
    setCurrentImageIndex(0);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setCurrentGroup(null);
    setCurrentImageIndex(0);
  };

  const groupedImages = chatOverview?.album?.reduce(
    (acc: Record<string, ImageInfo[]>, image) => {
      const uploadDate = new Date(image.uploadDate);
      const koreanDate = new Date(uploadDate.getTime() + 9 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

      acc[koreanDate] = acc[koreanDate] || [];
      acc[koreanDate].push(image);

      acc[koreanDate].sort(
        (a, b) =>
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime(),
      );

      return acc;
    },
    {},
  ) as Record<string, ImageInfo[]>;

  useEffect(() => {
    if (data) {
      setChatOverview(data.data);
    }
  }, [data]);

  return {
    data,
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
  };
};
