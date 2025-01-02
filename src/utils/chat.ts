import { RoomResponse, SortType } from '@/@types/chat';

export const sortRooms = (
  rooms: RoomResponse[],
  sortType: SortType,
): RoomResponse[] => {
  return [...rooms].sort((a, b) => {
    if (sortType === 'latest') {
      return (
        new Date(b.lastMessageTime).getTime() -
        new Date(a.lastMessageTime).getTime()
      );
    }
    if (sortType === 'unread') {
      if (a.unreadMessageCount === 0 && b.unreadMessageCount > 0) return 1;
      if (a.unreadMessageCount > 0 && b.unreadMessageCount === 0) return -1;

      return (
        new Date(b.lastMessageTime).getTime() -
        new Date(a.lastMessageTime).getTime()
      );
    }
    return 0;
  });
};

export const formatDateToKorean = (dateString: string) => {
  const dateParts = dateString.match(/\d+/g);
  if (!dateParts) return '';

  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  return `${year}년 ${month}월 ${day}일`;
};

export const formatTimeToKorean = (dateString: string) => {
  const timeMatch = dateString.match(/(오전|오후)\s(\d+):(\d+)/);
  if (!timeMatch) return '';

  const period = timeMatch[1];
  const hour = parseInt(timeMatch[2], 10);
  const minutes = timeMatch[3];

  return `${period} ${hour}:${minutes}`;
};
