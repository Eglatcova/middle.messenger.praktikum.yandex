import { Link, ErrorBanner } from "../../components";
import { Routes } from "../../constants";
import { Block, Router } from "../../services";
import { BaseBlockProps } from "../../services/types";
import template from "./error500.hbs";

class Error500 extends Block {
  constructor() {
    const props: BaseBlockProps = {
      classNames: ["page-wrapper"],
    };

    super("main", props);
  }

  init() {
    this.children.errorBanner = new ErrorBanner({
      code: "500",
      text: "Мы уже фиксим",
    });

    this.children.link = new Link({
      label: "Назад к чатам",
      events: {
        click: () => {
          Router.go(Routes.PROFILE);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Error500 };
