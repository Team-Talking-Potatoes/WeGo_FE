import { CHAT_SORT_OPTIONS } from '@/constants/chat';

export type SortType = keyof typeof CHAT_SORT_OPTIONS;

export interface RoomResponse {
  chatId: string;
  chattingName: string;
  host: string;
  hasJoined: boolean;
  lastMessageTime: string;
  image: string;
  unreadMessageCount: number;
  membersCount: number;
  totalMembersCount: number;
  hostProfileImage: string;
  description: string;
}

export interface ChattingResponse {
  chatTitle: string;
  chatMessages: ChatMessage[];
}

export interface ChatMessage {
  chatMessageId: string;
  images: string[];
  content: string;
  sender: string;
  senderProfileImage: string;
  createdAt: string;
  unreadCount: number;
}

export interface ChatOverview {
  participants: Participant[];
  album: ImageInfo[];
}

export interface ImageInfo {
  images: string[];
  uploadDate: string;
  uploader: string;
}
export interface Participant {
  user: string;
  email: string;
  description: string;
  profileImage: string;
  travelCount: number;
}
