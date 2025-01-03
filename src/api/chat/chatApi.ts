import { ChatOverview, ChattingResponse } from '@/@types/chat';
import { http } from '../fetcher';

interface ChattingsResponse {
  status: string;
  data: ChattingResponse;
}

interface ChatOverviewResponse {
  status: string;
  data: ChatOverview;
}

interface UploadChatImagesResponse {
  status: string;
  data: string[];
}

interface JoinResponse {
  status: string;
  data: string[];
}

export const getChat = async (
  chatId: string,
  latest: number,
): Promise<ChattingsResponse> => {
  const queryParams = latest !== -1 ? `?latest=${latest}` : '';
  return http.get<ChattingsResponse>(`/chat/${chatId}${queryParams}`);
};

export const getChatOverview = async (
  chatId: string,
): Promise<ChatOverviewResponse> => {
  return http.get<ChatOverviewResponse>(`/chat/${chatId}/overview`);
};

export const setIsJoined = async (chatId: string): Promise<JoinResponse> => {
  return http.post<JoinResponse>(`/chat/${chatId}`);
};

export const uploadChatImages = async (
  chatId: string,
  images: File[],
): Promise<UploadChatImagesResponse> => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append('files', image);
  });

  return http.post<UploadChatImagesResponse>(`/chat/${chatId}/image`, formData);
};
