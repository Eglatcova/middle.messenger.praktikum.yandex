export enum StoreEvents {
  Updated = "updated",
}

export interface LastMessage {
  user: {
    first_name: string;
    second_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
  };
  time: string;
  content: string;
}

export interface UserData {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  reason?: string;
}

export interface ChatItem {
  id: number;
  title: string;
  avatar: string | null;
  last_message: LastMessage | null;
  created_by: number;
}

export interface MessageItem {
  userName: string;
  content: string;
  time: string;
}

export interface State {
  user: {
    data: UserData;
    requestStatus: string;
    error?: string;
  };
  chat: {
    chats: ChatItem[] | null;
    currentChat: ChatItem | null;
    currentChatID: number;
    messages: Record<string, MessageItem[]>;
    sokets: Record<string, WebSocket>;
    requestStatus: string;
  };
}
