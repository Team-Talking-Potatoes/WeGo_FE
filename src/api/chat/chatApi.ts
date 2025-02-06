import { BaseResponse } from '@/@types/api';
import { ChatOverview, Chat } from '@/@types/chat';
import { http } from '../fetcher';

export const getChat = async (
  chatId: string,
  latest: number,
): Promise<BaseResponse<Chat>> => {
  const queryParams = latest !== -1 ? `?latest=${latest}` : '';
  return http.get<BaseResponse<Chat>>(`/chat/${chatId}${queryParams}`);
};

export const getChatOverview = async (
  chatId: string,
): Promise<BaseResponse<ChatOverview>> => {
  return http.get<BaseResponse<ChatOverview>>(`/chat/${chatId}/overview`);
};

export const setIsJoined = async (
  chatId: string,
): Promise<BaseResponse<string[]>> => {
  return http.post<BaseResponse<string[]>>(`/chat/${chatId}`);
};

export const uploadChatImages = async (
  chatId: string,
  images: File[],
): Promise<BaseResponse<string[]>> => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append('files', image);
  });

  return http.post<BaseResponse<string[]>>(`/chat/${chatId}/image`, formData);
};
