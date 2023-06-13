import { HTTPTransport } from "../../services";
import { PostSigninData, PostSignupData, BackendUserData } from "./types";

class AuthAPI {
  private static endpoint = "/auth";
  private http = new HTTPTransport(AuthAPI.endpoint);

  signup(data: PostSignupData) {
    return this.http.post("/signup", data);
  }

  signin(data: PostSigninData) {
    return this.http.post<Response>("/signin", data);
  }

  logout() {
    return this.http.post("/logout");
  }

  getUser() {
    return this.http.get<BackendUserData>("/user");
  }
}

export { AuthAPI };
