import { BaseResponse } from '@/@types/api';
import { ChatRoom, SortType } from '@/@types/chat';
import { http } from '../fetcher';

export const getChatRooms = async (
  sortType: SortType,
): Promise<BaseResponse<ChatRoom[]>> => {
  return http.get<BaseResponse<ChatRoom[]>>(`/chat?sortType=${sortType}`);
};

export const leaveChat = async (
  chatId: string,
): Promise<BaseResponse<null>> => {
  return http.delete<BaseResponse<null>>(`/chat/${chatId}`);
};
