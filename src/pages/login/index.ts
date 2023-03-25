import { Title, Link } from "../../components";
import { goTo } from "../../helpers";
import { Block } from "../../utils";
import { BaseBlockProps } from "../../utils/types";
import { Form } from "./components";
import template from "./login.hbs";

class Login extends Block {
  constructor() {
    const props: BaseBlockProps = {
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
