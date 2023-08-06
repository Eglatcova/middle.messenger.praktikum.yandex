import { Title, Link } from "../../components";
import { Routes } from "../../constants";
import { Block, Router } from "../../services";
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

    this.children.link = new Link({
      label: "Нет аккаунта?",
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

export { Login };
