import {
  getChat,
  setIsJoined,
  getChatRooms,
  uploadChatImages,
  getChatOverview,
} from './chatRoom';

export const chat = [
  getChatRooms,
  getChat,
  setIsJoined,
  uploadChatImages,
  getChatOverview,
];
