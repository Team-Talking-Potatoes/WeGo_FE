import {
  getChat,
  setIsJoined,
  getChatRooms,
  uploadChatImages,
} from './chatRoom';

export const chat = [getChatRooms, getChat, setIsJoined, uploadChatImages];
