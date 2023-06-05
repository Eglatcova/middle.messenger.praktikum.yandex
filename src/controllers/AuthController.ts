/* eslint-disable no-console */

import { AuthAPI } from "../api";
import { PostSigninData, PostSignupData } from "../api/AuthAPI/types";
import { RequestStatus, Routes } from "../constants";
import { Router, Store } from "../services";

export class AuthController {
  api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signup(data: PostSignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();
      Router.go(Routes.PROFILE);
    } catch (e) {
      console.error(e);
    }
  }

  async signin(data: PostSigninData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

      Router.go(Routes.PROFILE);
    } catch (e) {
      console.log("signin", e);
    }
  }

  async logout() {
    try {
      await this.api.logout();

      Store.set("user.data", {
        id: "",
        first_name: "",
        second_name: "",
        display_name: "",
        login: "",
        email: "",
        phone: "",
        avatar: "",
      });
      Router.go(Routes.LOGIN);
    } catch (e) {
      console.error(e);
    }
  }

  async fetchUser() {
    try {
      Store.set("user.requestStatus", RequestStatus.LOADING);

      const user = await this.api.getUser();

      if (user.reason) {
        throw new Error(user.reason);
      }

      Store.set("user.data", user);
      Store.set("user.requestStatus", RequestStatus.SUCCESS);
    } catch (e) {
      throw new Error();
    }
  }
}

const authController = new AuthController();

export { authController };
