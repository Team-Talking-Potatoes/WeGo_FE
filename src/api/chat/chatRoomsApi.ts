import { RoomResponse, SortType } from '@/@types/chat';
import { http } from '../fetcher';

interface RoomsResponse {
  status: string;
  data: RoomResponse[];
}

export const getChatRooms = async (
  sortBy: SortType,
): Promise<RoomsResponse> => {
  return http.get<RoomsResponse>(`/chat?sortBy=${sortBy}`);
};
