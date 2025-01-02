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
  const [imageUrls, setImageUrls] = useState<File[]>([]);
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
  }, []);

  const handleSend = async () => {
    if (isLoading) return;

    if (message.trim() || imageUrls.length) {
      setIsLoading(true);

      try {
        if (imageUrls.length) {
          const uploadedImages = await mutateAsync({
            chatId,
            images: imageUrls,
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);

      const totalImages = imageUrls.length + uploadedFiles.length;

      if (totalImages > 9) {
        openModal();
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      setImageUrls((prev) => [...prev, ...uploadedFiles]);
    }
  };

  const handleImageRemove = (url: File) => {
    setImageUrls((prev) => prev.filter((imageUrl) => imageUrl !== url));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    message,
    textareaRef,
    fileInputRef,
    imageUrls,
    isOpen,
    isLoading,
    setMessage,
    closeModal,
    handleSend,
    handleFileChange,
    handleImageRemove,
  };
};
