export interface PostChatData {
  title: string;
}

export interface DeleteChatData {
  chatId: number;
}

export interface GetChatData {
  offset?: number;
  limit?: number;
  title?: string;
}

export interface GetChatToken {
  id: number;
}

export interface BackendLastMessage {
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

export interface BackendChatItem {
  id: number;
  title: string;
  avatar: string | null;
  last_message: BackendLastMessage | null;
  created_by: number;
}

export interface ChatToken {
  token: string;
}

export interface PutUsersData {
  users: number[];
  chatId: number;
}

export interface DeleteUsersData extends PutUsersData {}
