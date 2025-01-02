import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setIsJoined, uploadChatImages } from '@/api/chat/chatApi';
import { QueryError } from '@/@types/query';

interface Props {
  chatId: string;
}

export const useSetIsJoined = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chatId }: Props) => setIsJoined(chatId),
    onError: (error: QueryError) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chatRooms', 'latest'],
      });
      queryClient.invalidateQueries({
        queryKey: ['chatRooms', 'unread'],
      });
    },
  });
};

interface UploadImagesProps {
  chatId: string;
  images: File[];
}

export const useUploadChatImages = () => {
  return useMutation({
    mutationFn: ({ chatId, images }: UploadImagesProps) =>
      uploadChatImages(chatId, images),
    onError: (error: QueryError) => {
      console.error(error);
    },
  });
};
