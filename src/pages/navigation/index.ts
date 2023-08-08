import { Link } from "../../components";
import { Routes } from "../../constants";
import { Block, Router } from "../../services";

import template from "./navigation.tmpl";

class Navigation extends Block {
  constructor() {
    super("main", {});
  }

  init() {
    this.children.linkChat = new Link({
      label: "Чат",
      events: {
        click: () => {
          Router.go(Routes.MESSENGER);
        },
      },
    });

    this.children.linkError404 = new Link({
      label: "Ошибка 404",
      events: {
        click: () => {
          Router.go(Routes.ERROR_404);
        },
      },
    });

    this.children.linkError500 = new Link({
      label: "Ошибка 505",
      events: {
        click: () => {
          Router.go(Routes.ERROR_500);
        },
      },
    });

    this.children.linkLogin = new Link({
      label: "Авторизация",
      events: {
        click: () => {
          Router.go(Routes.LOGIN);
        },
      },
    });

    this.children.linkPasswordSettings = new Link({
      label: "Настройки пароля",
      events: {
        click: () => {
          Router.go(Routes.PROFILE_SETTIGS);
        },
      },
    });

    this.children.linkProfile = new Link({
      label: "Профиль",
      events: {
        click: () => {
          Router.go(Routes.PROFILE);
        },
      },
    });

    this.children.linkProfileSettings = new Link({
      label: "Настройки профиля",
      events: {
        click: () => {
          Router.go(Routes.PROFILE_SETTIGS);
        },
      },
    });

    this.children.linkRegistration = new Link({
      label: "Регистрация",
      events: {
        click: () => {
          Router.go(Routes.REGISTRATION);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Navigation };
