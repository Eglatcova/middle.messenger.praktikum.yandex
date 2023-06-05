import { HTTPTransport } from "../../services";
import { BackendUserData } from "./types";

class UserAPI {
  private static endpoint = "/user";
  private http = new HTTPTransport(UserAPI.endpoint);

  searchUser(login: string) {
    return this.http.post<BackendUserData[]>("/search", { login });
  }

  searchUserByID(id: string) {
    return this.http.get<BackendUserData>(`/${id}`);
  }
}

export { UserAPI };
