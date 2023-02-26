import { Link, ErrorBanner } from "../../components";
import { Block } from "../../utils";
import template from "./error500.hbs";

class Error500 extends Block {
  constructor() {
    const props = {
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
          console.log("route");
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Error500 };
