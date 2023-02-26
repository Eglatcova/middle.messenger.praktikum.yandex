import { Input, Title, ButtonBase, Link } from "../../components";
import { Block } from "../../utils";
import template from "./login.hbs";

class Login extends Block {
  constructor() {
    const props = {
      classNames: ["page-wrapper", "login"],
    };

    super("main", props);
  }

  init() {
    this.children.title = new Title({
      label: "Вход",
    });

    this.children.inputLogin = new Input({
      id: "login",
      label: "Логин",
      type: "text",
      name: "login",
      placeholder: "Введите логин",
    });

    this.children.inputPassword = new Input({
      id: "password",
      label: "Пароль",
      type: "text",
      name: "password",
      placeholder: "Введите пароль",
    });

    this.children.button = new ButtonBase({
      label: "Авторизоваться",
      classNames: ["login_button__submit"],
      attributes: {
        type: "submit",
      },
    });

    this.children.link = new Link({
      label: "Нет аккаунта?",
      events: {
        click: () => {
          console.log("route");
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Login };
