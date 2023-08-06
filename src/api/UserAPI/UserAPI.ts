import { HTTPTransport } from "../../services";
import {
  BackendUserData,
  ChangePasswordData,
  ChangeProfileData,
} from "./types";

class UserAPI {
  private static endpoint = "/user";
  private http = new HTTPTransport(UserAPI.endpoint);

  cheangeProfile(data: ChangeProfileData) {
    return this.http.put<BackendUserData>("/profile", data);
  }

  cheangePassword(data: ChangePasswordData) {
    return this.http.put<{ reason: string } | null>("/password", data);
  }

  updateAvatar(data: FormData) {
    return this.http.put<BackendUserData>("/profile/avatar", data);
  }

  searchUser(login: string) {
    return this.http.post<BackendUserData[]>("/search", { login });
  }

  searchUserByID(id: string) {
    return this.http.get<BackendUserData>(`/${id}`);
  }
}

export { UserAPI };
