import { Field, Title, ButtonBase, Link } from "../../components";
import { goTo } from "../../helpers";
import { Block } from "../../utils";
import { Form } from "./components";
import template from "./login.hbs";

class Login extends Block {
  constructor() {
    const props = {
      classNames: ["page-wrapper"],
    };

    super("main", props);
  }

  init() {
    this.children.title = new Title({
      label: "Вход",
    });

    this.children.form = new Form();

    this.children.fieldLogin = new Field({
      id: "login",
      label: "Логин",
      type: "text",
      name: "login",
      placeholder: "Введите логин",
      required: true,
    });

    this.children.fieldPassword = new Field({
      id: "password",
      label: "Пароль",
      type: "text",
      name: "password",
      placeholder: "Введите пароль",
      required: true,
    });

    this.children.link = new Link({
      label: "Нет аккаунта?",
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

export { Login };
