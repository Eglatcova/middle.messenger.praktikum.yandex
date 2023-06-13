import { chatController } from "../../controllers/ChatController";
import { Store } from "./Store";
import { ChatItem, MessageItem } from "./types";

const getChats = () => Store.getState().chat.chats;

const getUserData = () => Store.getState().user.data;

const getCurrentChat = () => Store.getState().chat.currentChat;
const getSockets = () => Store.getState().chat.sokets;

const setCurrentChatID = (currentChatID: number) => {
  Store.set("chat.currentChatID", currentChatID);
};

const setCurrentChat = async (currentChat: ChatItem | null) => {
  if (currentChat === null) {
    Store.set("chat.currentChat", currentChat);
    return;
  }
  const token = await chatController.getChatToken({ id: currentChat.id });

  const sockets = getSockets();

  if (currentChat !== null && sockets[currentChat.id] === undefined) {
    chatController.connect({
      chatID: currentChat.id,
      token,
    });
  }

  Store.set("chat.currentChat", currentChat);
  Store.set("chat.currentChatID", currentChat.id);
};

const setMessage = (message: MessageItem) => {
  const { messages, currentChat } = Store.getState().chat;
  if (currentChat !== null) {
    Store.set("chat.messages", {
      [currentChat.id]: [...messages[currentChat.id], message],
    });
  }
};

export {
  getChats,
  setCurrentChat,
  setMessage,
  getCurrentChat,
  getSockets,
  getUserData,
  setCurrentChatID,
};
