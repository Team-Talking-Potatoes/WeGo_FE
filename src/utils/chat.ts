import { ChatRoom, SortType } from '@/@types/chat';

export const sortRooms = (
  rooms: ChatRoom[],
  sortType: SortType,
): ChatRoom[] => {
  return [...rooms].sort((a, b) => {
    if (sortType === 'RECENT') {
      return (
        new Date(b.lastMessageTime).getTime() -
        new Date(a.lastMessageTime).getTime()
      );
    }
    if (sortType === 'UNREAD') {
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
  const [datePart] = dateString.split(' '); // "2025.01.04"
  const [year, month, day] = datePart
    .split('.')
    .map((value) => parseInt(value, 10));

  return `${year}년 ${month}월 ${day}일`;
};

export const formatTimeToKorean = (dateString: string) => {
  const [, timePart] = dateString.split(' '); // "16:30"
  const [hourString, minute] = timePart.split(':');
  let hour = parseInt(hourString, 10);
  const period = hour >= 12 ? '오후' : '오전';

  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }

  return `${period} ${hour}:${minute}`;
};
