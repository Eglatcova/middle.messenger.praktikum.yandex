import { Title, ButtonBase, Link } from "../../components";
import { goTo } from "../../helpers";
import { Block } from "../../utils";
import { Form } from "./components";
import template from "./registration.hbs";

class Registration extends Block {
  constructor() {
    const props = {
      classNames: ["page-wrapper"],
    };

    super("main", props);
  }

  init() {
    this.children.title = new Title({
      label: "Регистрация",
    });

    this.children.form = new Form();

    this.children.link = new Link({
      label: "Войти",
      events: {
        click: () => {
          goTo("login");
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Registration };
