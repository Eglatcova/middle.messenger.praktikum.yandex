import { Link, ErrorBanner } from "../../components";
import { goTo } from "../../helpers";
import { Block } from "../../utils";
import { BaseBlockProps } from "../../utils/types";
import template from "./error404.hbs";

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
          goTo("chat");
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Error404 };
