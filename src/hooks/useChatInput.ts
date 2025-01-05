/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { useUploadChatImages } from '@/queries/chat/useSetChat';

interface ChatInputOptions {
  chatId: string;
  onSendMessage: (message: string, images: string[]) => void;
  onHeightChange: (height: number) => void;
}

export const useChatInput = ({
  chatId,
  onSendMessage,
  onHeightChange,
}: ChatInputOptions) => {
  const [message, setMessage] = useState('');
  const [imageUrls, setImageUrls] = useState<{ file: File; url: string }[]>([]);
  const [modalData, setModalData] = useState({
    title: '이미지 최대 등록 갯수 초과',
    description: '이미지는 최대 9장 등록 가능합니다.',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync } = useUploadChatImages();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      const inputBoxHeight = imageUrls.length
        ? textareaRef.current.offsetHeight + 72
        : textareaRef.current.offsetHeight;
      onHeightChange(inputBoxHeight);
    }
  };

  useEffect(() => {
    updateTextareaHeight();

    const handleResize = () => {
      updateTextareaHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [message, imageUrls]);

  const handleSend = async () => {
    if (isLoading) return;

    if (message.trim() || imageUrls.length) {
      setIsLoading(true);

      try {
        if (imageUrls.length) {
          const uploadedImages = await mutateAsync({
            chatId,
            images: imageUrls.map(({ file }) => file),
          });
          onSendMessage(message.trim(), uploadedImages.data);
        } else onSendMessage(message.trim(), []);
        setMessage('');
        setImageUrls([]);
      } catch (error) {
        console.error('이미지 업로드 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50MB

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);

      // 현재 업로드된 파일 개수 확인
      const totalImages = imageUrls.length + uploadedFiles.length;
      if (totalImages > 9) {
        setModalData({
          title: '이미지 최대 등록 갯수 초과',
          description: '이미지는 최대 9장 등록 가능합니다.',
        });
        openModal();
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      // 개별 파일 크기 확인
      const oversizedFiles = uploadedFiles.filter(
        (file) => file.size > MAX_FILE_SIZE,
      );
      if (oversizedFiles.length > 0) {
        setModalData({
          title: '이미지 최대 크기 초과',
          description: '각 파일 크기는 10MB를 초과할 수 없습니다.',
        });
        openModal();

        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      // 전체 파일 크기 확인
      const totalSize =
        imageUrls.reduce((acc, img) => acc + img.file.size, 0) +
        uploadedFiles.reduce((acc, file) => acc + file.size, 0);
      if (totalSize > MAX_TOTAL_SIZE) {
        setModalData({
          title: '이미지 최대 크기 초과',
          description: '전체 요청 크기는 50MB를 초과할 수 없습니다.',
        });
        openModal();

        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      // 새로 추가된 파일에 대해 Blob URL 생성
      const newImageUrls = uploadedFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      setImageUrls((prev) => [...prev, ...newImageUrls]);
    }
  };

  const handleImageRemove = (fileToRemove: File) => {
    const removedImage = imageUrls.find((image) => image.file === fileToRemove);
    if (removedImage) {
      URL.revokeObjectURL(removedImage.url);
    }
    setImageUrls((prev) => prev.filter((image) => image.file !== fileToRemove));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    return () => {
      imageUrls.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [imageUrls]);

  return {
    message,
    textareaRef,
    fileInputRef,
    imageUrls,
    modalData,
    isOpen,
    isLoading,
    setMessage,
    closeModal,
    handleSend,
    handleFileChange,
    handleImageRemove,
  };
};
