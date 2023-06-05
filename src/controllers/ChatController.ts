/* eslint-disable no-console */

import { ChatAPI, UserAPI } from "../api";
import {
  ChatToken,
  DeleteChatData,
  GetChatData,
  GetChatToken,
  PostChatData,
} from "../api/ChatAPI/types";
import { Store } from "../services";
import { ChatItem } from "../services/Store/types";
import { ChatConnectParams } from "./types";

export class ChatController {
  api: ChatAPI;

  constructor() {
    this.api = new ChatAPI();
  }

  async getChat(data: GetChatData): Promise<ChatItem[]> {
    try {
      const chatsList: ChatItem[] = await this.api.getChat(data);
      Store.set("chat.chats", chatsList);
      return chatsList;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async createChat(data: PostChatData) {
    try {
      await this.api.createChat(data);
    } catch (e) {
      console.error(e);
    }
  }

  async deleteChat(data: DeleteChatData) {
    try {
      await this.api.deleteChat(data);
    } catch (e) {
      console.error(e);
    }
  }

  async addUser(login: string) {
    try {
      const userAPI = new UserAPI();
      const [user] = await userAPI.searchUser(login);
      const chatID = Store.getState().chat.currentChat?.id;

      await this.api.addUsers({
        users: [user.id],
        chatId: chatID || 0,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async deleteUser(login: string) {
    try {
      const userAPI = new UserAPI();
      const [user] = await userAPI.searchUser(login);
      const chatID = Store.getState().chat.currentChat?.id;

      await this.api.deleteUsers({
        users: [user.id],
        chatId: chatID || 0,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async getChatToken(data: GetChatToken): Promise<string> {
    try {
      const { token }: ChatToken = await this.api.getChatToken(data);
      return token;
    } catch (e) {
      console.error(e);
      return "";
    }
  }

  async connect(params: ChatConnectParams) {
    const { chatID, token } = params;
    const userID = Store.getState().user.data.id;
    const socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userID}/${chatID}/${token}`
    );

    const PING_MESSAGE = "";

    Store.set("chat.sokets", { [chatID]: socket });

    socket.addEventListener("open", () => {
      console.log("Соединение установлено");

      setInterval(() => {
        socket.send(
          JSON.stringify({
            content: PING_MESSAGE,
            type: "message",
          })
        );
      }, 15000);

      socket.send(
        JSON.stringify({
          content: "В сети",
          type: "message",
        })
      );
    });

    socket.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener("message", async (event) => {
      console.log("Получены данные", event.data);
      const message = JSON.parse(event.data);
      const { messages, currentChat } = Store.getState().chat;

      const userAPI = new UserAPI();
      const userData = await userAPI.searchUserByID(message.user_id);

      if (message.content === PING_MESSAGE || currentChat === null) return;

      const currentMessages = messages[currentChat.id] || [];
      Store.set("chat.messages", {
        [currentChat.id]: [
          ...currentMessages,
          {
            userName: userData.login,
            content: message.content,
            time: message.time,
          },
        ],
      });
    });

    socket.addEventListener("error", (event: Event & { message: string }) => {
      console.log("Ошибка", event.message);
    });
  }
}

const chatController = new ChatController();

export { chatController };
