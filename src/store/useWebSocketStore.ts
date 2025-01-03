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
  subscriptions: Map<string, Subscriptions>;
  connect: () => void;
  disconnect: () => void;
  subscribeToChat: (chatId: string) => void;
  unsubscribeFromChat: (chatId: string) => void;
  sendMessage: (
    chatId: string,
    message: { content: string; images: string[] },
  ) => void;
  sendReadReceipt: (chatId: string, chatMessageId: number) => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  client: null,
  connected: false,
  messages: {},
  unreadCounts: {},
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
}));
