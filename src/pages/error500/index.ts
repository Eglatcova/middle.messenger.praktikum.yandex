import { Link, ErrorBanner } from "../../components";
import { goTo } from "../../helpers";
import { Block } from "../../utils";
import { BaseBlockProps } from "../../utils/types";
import template from "./error500.hbs";

class Error500 extends Block<BaseBlockProps> {
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
          goTo("chat");
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Error500 };
