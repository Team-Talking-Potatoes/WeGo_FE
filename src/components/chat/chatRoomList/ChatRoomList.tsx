import ChatRoomItem from '@/components/chat/chatRoomList/ChatRoomItem';
import { RoomResponse } from '@/@types/chat';

interface Props {
  rooms: RoomResponse[];
  onChatRoomId: (chatId: string) => void;
  chatRoomId: string;
}

const ChatRoomList = ({ rooms, onChatRoomId, chatRoomId }: Props) => {
  return (
    <ul className="static h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
      {rooms.map((room) => (
        <ChatRoomItem
          key={room.chatId}
          room={room}
          onChatRoomId={onChatRoomId}
          selectedChatRoomId={chatRoomId}
        />
      ))}
    </ul>
  );
};

export default ChatRoomList;
