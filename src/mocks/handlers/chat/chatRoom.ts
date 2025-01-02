import { http, HttpResponse } from 'msw';
import chatRoom from '@/mocks/data/chat/chatRoom.json';
import chatOverview from '@/mocks/data/chat/chatOverview.json';

const chatRoomList = {
  status: '200',
  data: [
    {
      hasJoined: true,
      chatId: '11',
      chattingName: '도심 속 자연 여행',
      description: '서울의 주요 명소를 탐방하고 특별한 추억을 만들어보세요.',
      host: '닉네임C',
      membersCount: 4,
      totalMembersCount: 10,
      date: '24.12.14',
      image: '/user.jpg',
      hostProfileImage: '/user.jpg',
      unreadMessageCount: 0,
      lastMessageTime: '2024-12-14T01:28:12.660109',
    },
    {
      hasJoined: false,
      chatId: '12',
      chattingName: '남산 투어',
      description: '서울의 주요 명소를 탐방하고 특별한 추억을 만들어보세요.',
      host: '닉네임D',
      membersCount: 6,
      totalMembersCount: 10,
      date: '24.12.13',
      image: '/user.jpg',
      hostProfileImage: '/user.jpg',
      unreadMessageCount: 10,
      lastMessageTime: '2024-12-13T22:05:12.660123',
    },
    {
      hasJoined: true,
      chatId: '13',
      chattingName: '부여로 떠나는 다함께 시골투어',
      description: '서울의 주요 명소를 탐방하고 특별한 추억을 만들어보세요.',
      host: '닉네임D',
      membersCount: 3,
      totalMembersCount: 10,
      date: '24.12.13',
      image: '/user.jpg',
      hostProfileImage: '/user.jpg',
      unreadMessageCount: 0,
      lastMessageTime: '2024-12-13T18:34:12.660137',
    },
    {
      hasJoined: false,
      chatId: '14',
      chattingName: '남산 투어',
      description: '서울의 주요 명소를 탐방하고 특별한 추억을 만들어보세요.',
      host: '닉네임C',
      membersCount: 10,
      totalMembersCount: 10,
      date: '24.12.09',
      image: '/user.jpg',
      hostProfileImage: '/user.jpg',
      unreadMessageCount: 103,
      lastMessageTime: '2024-12-09T05:07:12.660151',
    },
    {
      hasJoined: true,
      chatId: '15',
      chattingName: '강원도로 떠나는 여행',
      description: '서울의 주요 명소를 탐방하고 특별한 추억을 만들어보세요.',
      host: '닉네임D',
      membersCount: 8,
      totalMembersCount: 10,
      date: '24.12.13',
      image: '/user.jpg',
      hostProfileImage: '/user.jpg',
      unreadMessageCount: 0,
      lastMessageTime: '2024-12-13T05:53:12.660166',
    },
    {
      hasJoined: false,
      chatId: '16',
      chattingName: '부여로 떠나는 다함께 시골투어',
      description: '서울의 주요 명소를 탐방하고 특별한 추억을 만들어보세요.',
      host: '닉네임A',
      membersCount: 2,
      totalMembersCount: 10,
      date: '24.12.12',
      image: '/user.jpg',
      hostProfileImage: '/user.jpg',
      unreadMessageCount: 50,
      lastMessageTime: '2024-12-12T14:54:12.660181',
    },
    {
      hasJoined: true,
      chatId: '17',
      chattingName: '전주 한옥마을 투어',
      description: '서울의 주요 명소를 탐방하고 특별한 추억을 만들어보세요.',
      host: '닉네임C',
      membersCount: 1,
      totalMembersCount: 10,
      date: '24.12.14',
      image: '/user.jpg',
      hostProfileImage: '/user.jpg',
      unreadMessageCount: 0,
      lastMessageTime: '2024-12-14T10:08:12.660194',
    },
    {
      hasJoined: false,
      chatId: '18',
      chattingName: '서울에서 1박2일 즐겨보아요 :)',
      description: '서울의 주요 명소를 탐방하고 특별한 추억을 만들어보세요.',
      host: '닉네임B',
      membersCount: 4,
      totalMembersCount: 10,
      date: '24.12.10',
      image: '/user.jpg',
      hostProfileImage: '/user.jpg',
      unreadMessageCount: 5,
      lastMessageTime: '2024-12-10T19:55:12.660208',
    },
    {
      hasJoined: true,
      chatId: '19',
      chattingName: '남산 투어',
      description: '서울의 주요 명소를 탐방하고 특별한 추억을 만들어보세요.',
      host: '닉네임D',
      membersCount: 9,
      totalMembersCount: 10,
      date: '24.12.08',
      image: '/user.jpg',
      hostProfileImage: '/user.jpg',
      unreadMessageCount: 0,
      lastMessageTime: '2024-12-08T22:58:12.660221',
    },
    {
      hasJoined: false,
      chatId: '20',
      chattingName: '행복한 부산 여행',
      description: '서울의 주요 명소를 탐방하고 특별한 추억을 만들어보세요.',
      host: '닉네임A',
      membersCount: 9,
      totalMembersCount: 10,
      date: '24.12.09',
      image: '/user.jpg',
      hostProfileImage: '/user.jpg',
      unreadMessageCount: 120,
      lastMessageTime: '2024-12-09T08:56:12.660243',
    },
  ],
};

export const getChatRooms = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/chat`,
  async () => {
    return HttpResponse.json(chatRoomList);
  },
);

export const getChat = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/chat/:id`,
  async ({ request, params }) => {
    const { id } = params;

    if (id === 'overview') {
      return HttpResponse.json(chatOverview);
    }

    const url = new URL(request.url);
    const latest =
      url.searchParams.get('latest') === null
        ? null
        : Number(url.searchParams.get('latest'));

    if (latest === null) {
      const messagesToSend = chatRoom.messages.slice(-10);

      return HttpResponse.json({
        status: '200',
        data: {
          chatTitle: chatRoom.title,
          chatMessages: messagesToSend,
        },
      });
    }

    const latestIndex = chatRoom.messages.findIndex(
      (message) => Number(message.chatMessageId) === latest,
    );

    if (latestIndex === -1 || chatRoom.messages.length === 0) {
      return HttpResponse.json({
        status: '200',
        data: {
          chatTitle: chatRoom.title,
          chatMessages: [],
        },
      });
    }

    const messagesToSend = chatRoom.messages.slice(
      Math.max(0, latestIndex - 10),
      latestIndex,
    );

    return HttpResponse.json({
      status: '200',
      data: {
        chatTitle: chatRoom.title,
        chatMessages: messagesToSend,
      },
    });
  },
);

export const setIsJoined = http.post(
  `${process.env.NEXT_PUBLIC_BASE_URL}/chat/join/:id`,
  async ({ params }) => {
    const { id } = params;
    const roomIndex = chatRoomList.data.findIndex((room) => room.chatId === id);

    chatRoomList.data[roomIndex].hasJoined = true;
    return HttpResponse.json({
      status: 'success',
      data: null,
    });
  },
);

const mockImageUrls = (count: number) => {
  return Array.from(
    { length: count },
    (_, index) => `/user.jpg?unique=${Date.now()}_${index}`,
  );
};

export const uploadChatImages = http.post(
  `${process.env.NEXT_PUBLIC_BASE_URL}/chat/:chatId/images`,
  async ({ request }) => {
    const formData = await request.formData();
    const images = formData.getAll('images');

    const uploadedImageUrls = mockImageUrls(images.length);

    return HttpResponse.json({
      status: '200',
      data: uploadedImageUrls,
    });
  },
);
