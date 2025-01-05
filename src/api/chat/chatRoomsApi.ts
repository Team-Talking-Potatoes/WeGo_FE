import { RoomResponse, SortType } from '@/@types/chat';
import { http } from '../fetcher';

interface RoomsResponse {
  status: string;
  data: RoomResponse[];
}

interface LeaveChatResponse {
  status: string;
  data: null;
}

export const getChatRooms = async (
  sortType: SortType,
): Promise<RoomsResponse> => {
  return http.get<RoomsResponse>(`/chat?sortType=${sortType}`);
};

export const leaveChat = async (chatId: string): Promise<LeaveChatResponse> => {
  return http.delete<LeaveChatResponse>(`/chat/${chatId}`);
};
// 나가기 기능
