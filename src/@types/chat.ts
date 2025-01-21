import { CHAT_SORT_OPTIONS } from '@/constants/chat';

export interface ChatRoom {
  chatId: string;
  chattingName: string;
  description: string;
  host: string;
  hostProfileImage: string;
  hasJoined: boolean;
  unreadMessageCount: number;
  lastMessageTime: string;
  image: string;
  membersCount: number;
  totalMembersCount: number;
}

export interface Chat {
  chatTitle: string;
  chatMessages: ChatMessage[];
}

export interface ChatOverview {
  participants: Participant[];
  album: ImageInfo[];
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

export type SortType = keyof typeof CHAT_SORT_OPTIONS;
