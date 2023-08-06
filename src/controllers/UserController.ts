/* eslint-disable no-alert */
/* eslint-disable no-console */
import { UserAPI } from "../api";
import { ChangePasswordData, ChangeProfileData } from "../api/UserAPI/types";
import { Routes } from "../constants";
import { Router, Store } from "../services";

export class UserController {
  api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async cheangeProfile(data: ChangeProfileData) {
    try {
      const userData = await this.api.cheangeProfile(data);
      Store.set("user.data", userData);

      Router.go(Routes.PROFILE);
    } catch (e) {
      console.error(e);
    }
  }

  async cheangePassword(data: ChangePasswordData) {
    try {
      const response = await this.api.cheangePassword(data);

      if (response === null) {
        alert("Пароль изменен");
        Router.go(Routes.PROFILE);
        return;
      }
      alert(response.reason);
    } catch (e) {
      console.error(e);
    }
  }

  async updateAvatar(data: FormData) {
    try {
      const userData = await this.api.updateAvatar(data);
      Store.set("user.data", userData);
    } catch (e) {
      console.error(e);
    }
  }
}

const userController = new UserController();

export { userController };
