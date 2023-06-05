import { HTTPTransport } from "../../services";
import {
  BackendChatItem,
  ChatToken,
  DeleteChatData,
  DeleteUsersData,
  GetChatData,
  GetChatToken,
  PostChatData,
  PutUsersData,
} from "./types";

class ChatAPI {
  private static endpoint = "/chats";
  private http = new HTTPTransport(ChatAPI.endpoint);

  getChat(data: GetChatData) {
    return this.http.get<BackendChatItem[]>("", data);
  }

  createChat(data: PostChatData) {
    return this.http.post("", data);
  }

  deleteChat(data: DeleteChatData) {
    return this.http.delete("", data);
  }

  addUsers(data: PutUsersData) {
    return this.http.put("/users", data);
  }

  deleteUsers(data: DeleteUsersData) {
    return this.http.delete("/users", data);
  }

  getChatToken(data: GetChatToken) {
    return this.http.post<ChatToken>(`/token/${data.id}`);
  }
}

export { ChatAPI };
