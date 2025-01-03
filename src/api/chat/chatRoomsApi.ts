import { RoomResponse, SortType } from '@/@types/chat';
import { http } from '../fetcher';

interface RoomsResponse {
  status: string;
  data: RoomResponse[];
}

export const getChatRooms = async (
  sortType: SortType,
): Promise<RoomsResponse> => {
  return http.get<RoomsResponse>(`/chat?sortType=${sortType}`);
};
