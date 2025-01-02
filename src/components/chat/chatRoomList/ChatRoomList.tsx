import ChatRoomItem from '@/components/chat/chatRoomList/ChatRoomItem';
import { RoomResponse } from '@/@types/chat';

interface Props {
  rooms: RoomResponse[];
  onExit: (id: string) => void;
  onChatRoomId: (chatId: string) => void;
}

const ChatRoomList = ({ rooms, onExit, onChatRoomId }: Props) => {
  return (
    <ul className="static h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
      {rooms.map((room) => (
        <ChatRoomItem
          key={room.chatId}
          room={room}
          onExit={onExit}
          onChatRoomId={onChatRoomId}
        />
      ))}
    </ul>
  );
};

export default ChatRoomList;
