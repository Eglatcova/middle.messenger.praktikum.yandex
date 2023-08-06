/* eslint-disable max-classes-per-file */
import { expect } from "chai";
import { Route, Router } from "./Router";
import { Block } from "./Block";
import { Routes } from "../constants";

describe("Router", () => {
  class LoginPage extends Block {}
  class ProfilePage extends Block {}
  class PasswordSettingsPage extends Block {}

  Router.use(Routes.LOGIN, LoginPage)
    .use(Routes.PROFILE_SETTIGS, ProfilePage)
    .use(Routes.PASSWORD_SETTINGS, PasswordSettingsPage);

  Router.start();

  it("переходы должны записываться в историю", () => {
    Router.go(Routes.LOGIN);
    Router.go(Routes.PASSWORD_SETTINGS);
    expect(Router.history.length).to.eq(3);
  });

  it("должен меняться текущий адрес при переходе", () => {
    Router.go(Routes.LOGIN);
    const { pathname } = Router.currentRoute as Route;
    expect(pathname).to.eq(Routes.LOGIN);
  });
});
