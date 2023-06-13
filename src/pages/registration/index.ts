import { Title, Link } from "../../components";
import { Routes } from "../../constants";
import { Block, Router } from "../../services";
import { BaseBlockProps } from "../../services/types";
import { Form } from "./components";
import template from "./registration.hbs";

class Registration extends Block {
  constructor() {
    const props: BaseBlockProps = {
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
          Router.go(Routes.LOGIN);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Registration };
