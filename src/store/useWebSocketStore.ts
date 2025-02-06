/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { create } from 'zustand';
import { ChatMessage } from '@/@types/chat';

interface Subscriptions {
  chat: StompSubscription;
  readReceipt: StompSubscription;
}

interface WebSocketState {
  client: Client | null;
  connected: boolean;
  messages: Record<string, ChatMessage[]>; // 채팅 ID별 메시지 저장
  unreadCounts: Record<string, number>; // 채팅 ID별 unreadCount 저장
  chatUpdates: Record<
    string,
    {
      currentMemberCount: number;
      sendAt: string;
      status: 'JOIN' | 'LEAVE' | 'MESSAGE';
      participant?: {
        nickname: string;
        email: string;
        description: string;
        profileImage: string;
        travelCount: number;
      };
    }
  >;
  subscriptions: Map<string, Subscriptions>;
  connect: () => void;
  disconnect: () => void;
  subscribeToChat: (chatId: string) => void;
  unsubscribeFromChat: (chatId: string) => void;
  sendMessage: (
    chatId: string,
    message: { message: string; images: string[] },
  ) => void;
  sendReadReceipt: (chatId: string, chatMessageId: number) => void;
  subscribeToAlarm: (userId: string) => void; // 새로운 토픽 구독 함수
  unsubscribeFromAlarm: (userId: string) => void; // 알림 구독 해제 함수
  resetStatus: (chatId: string) => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  client: null,
  connected: false,
  messages: {},
  unreadCounts: {},
  chatUpdates: {},
  subscriptions: new Map(),

  connect: () => {
    const client = new Client({
      brokerURL: 'wss://api.we-go.world/ws',
      reconnectDelay: 10000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      console.log('WebSocket connected');
      set({ connected: true });

      const { subscriptions } = get();
      subscriptions.forEach((_, chatId) => {
        get().subscribeToChat(chatId);
      });
    };

    client.onDisconnect = () => {
      console.log('WebSocket disconnected');
      set({ connected: false });
    };

    client.onStompError = (frame) => {
      console.log('Broker reported error:', frame.headers.message);
      console.log('frame:', frame);
      set({ connected: false });
    };

    client.activate();
    set({ client });
  },

  disconnect: () => {
    const { client } = get();
    client?.deactivate();
    set({
      client: null,
      connected: false,
      subscriptions: new Map(),
      messages: {},
      unreadCounts: {},
    });
  },

  subscribeToChat: (chatId) => {
    const { client, subscriptions, connected } = get();
    if (!client || !connected) {
      console.warn('WebSocket client is not connected');
      return;
    }

    if (subscriptions.has(chatId)) return;

    const chatSubscription = client.subscribe(
      `/sub/chat/${chatId}`,
      (message: IMessage) => {
        const body = JSON.parse(message.body);
        set((state) => ({
          messages: {
            ...state.messages,
            [chatId]: [...(state.messages[chatId] || []), body],
          },
        }));
        get().sendReadReceipt(chatId, body.chatMessageId);
      },
    );

    const readReceiptSubscription = client.subscribe(
      `/sub/chat/read/${chatId}`,
      (message: IMessage) => {
        const body = JSON.parse(message.body);
        set((state) => ({
          unreadCounts: {
            ...state.unreadCounts,
            [chatId]: body.unreadCount,
          },
        }));
      },
    );

    subscriptions.set(chatId, {
      chat: chatSubscription,
      readReceipt: readReceiptSubscription,
    });

    set({ subscriptions });
  },

  unsubscribeFromChat: (chatId) => {
    const { subscriptions } = get();
    if (!subscriptions.has(chatId)) return;

    const subscription = subscriptions.get(chatId);
    subscription?.chat.unsubscribe();
    subscription?.readReceipt.unsubscribe();
    subscriptions.delete(chatId);

    set({ subscriptions });
  },

  sendMessage: (chatId, message) => {
    const { client, connected } = get();
    if (!client || !connected) {
      console.warn('WebSocket client is not connected');
      return;
    }
    client.publish({
      destination: `/pub/chat/${chatId}`,
      body: JSON.stringify(message),
    });
  },

  sendReadReceipt: (chatId, chatMessageId) => {
    const { client, connected } = get();
    if (!client || !connected) {
      console.warn('WebSocket client is not connected');
      return;
    }

    client.publish({
      destination: `/pub/chat/read/${chatId}`,
      body: JSON.stringify({ chatMessageId }),
    });
  },

  subscribeToAlarm: (userId) => {
    const { client, connected } = get();
    if (!client || !connected) {
      console.warn('WebSocket client is not connected');
      return;
    }

    const alarmSubscription = client.subscribe(
      `/sub/alarm/${userId}`,
      (message: IMessage) => {
        const body = JSON.parse(message.body);
        console.log('Alarm received:', body);

        // chatUpdates 상태 업데이트
        set((state) => ({
          chatUpdates: {
            ...state.chatUpdates,
            [body.chatId]: {
              currentMemberCount: body.currentMemberCount,
              sendAt: body.sendAt,
              status: body.status as 'JOIN' | 'LEAVE' | 'MESSAGE',
              participant: body.participant, // Optional
            },
          },
        }));
      },
    );

    set((state) => ({
      subscriptions: state.subscriptions.set(userId, {
        chat: alarmSubscription,
        readReceipt: null as any,
      }),
    }));
  },

  unsubscribeFromAlarm: (userId) => {
    const { subscriptions } = get();
    if (!subscriptions.has(userId)) return;

    const subscription = subscriptions.get(userId)?.chat;
    subscription?.unsubscribe();
    subscriptions.delete(userId);

    set({ subscriptions });
  },

  resetStatus: (chatId: string) => {
    set((state) => {
      const currentStatus = state.chatUpdates[chatId]?.status;
      if (currentStatus === 'JOIN') {
        return state; // 상태가 이미 'JOIN'이면 업데이트 중단
      }

      return {
        chatUpdates: {
          ...state.chatUpdates,
          [chatId]: {
            ...state.chatUpdates[chatId],
            status: 'JOIN',
            participant: undefined,
          },
        },
      };
    });
  },
}));
