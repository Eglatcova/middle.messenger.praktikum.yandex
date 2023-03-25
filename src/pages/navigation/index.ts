import { Link } from "../../components";
import { goTo } from "../../helpers";
import { Block } from "../../utils";
import template from "./navigation.hbs";

class Navigation extends Block {
  constructor() {
    super("main", {});
  }

  init() {
    this.children.linkChat = new Link({
      label: "Чат",
      events: {
        click: () => {
          goTo("chat");
        },
      },
    });

    this.children.linkError404 = new Link({
      label: "Ошибка 404",
      events: {
        click: () => {
          goTo("error404");
        },
      },
    });

    this.children.linkError500 = new Link({
      label: "Ошибка 505",
      events: {
        click: () => {
          goTo("error500");
        },
      },
    });

    this.children.linkLogin = new Link({
      label: "Авторизация",
      events: {
        click: () => {
          goTo("login");
        },
      },
    });

    this.children.linkPasswordSettings = new Link({
      label: "Настройки пароля",
      events: {
        click: () => {
          goTo("passwordSettings");
        },
      },
    });

    this.children.linkProfile = new Link({
      label: "Профиль",
      events: {
        click: () => {
          goTo("profile");
        },
      },
    });

    this.children.linkProfileSettings = new Link({
      label: "Настройки профиля",
      events: {
        click: () => {
          goTo("profileSettings");
        },
      },
    });

    this.children.linkRegistration = new Link({
      label: "Регистрация",
      events: {
        click: () => {
          goTo("registration");
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Navigation };
