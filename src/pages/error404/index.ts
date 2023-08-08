import { Link, ErrorBanner } from "../../components";
import { Routes } from "../../constants";
import { Block, Router } from "../../services";
import { BaseBlockProps } from "../../services/types";
import { template } from "./error404.tmpl";

class Error404 extends Block {
  constructor() {
    const props: BaseBlockProps = {
      classNames: ["page-wrapper"],
    };

    super("main", props);
  }

  init() {
    this.children.errorBanner = new ErrorBanner({
      code: "404",
      text: "Не туда попали",
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

export { Error404 };
