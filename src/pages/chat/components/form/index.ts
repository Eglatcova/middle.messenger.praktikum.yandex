import { Block } from "../../../../utils";
import snippetIcon from "../../../../../static/icons/snippet.svg";
import arrowBigIcon from "../../../../../static/icons/arrowBig.svg";
import template from "./form.hbs";
import { Input } from "./components";

class Form extends Block {
  constructor() {
    const props = {
      classNames: ["chat_form"],
      snippetIcon: snippetIcon,
      arrowBigIcon: arrowBigIcon,
      attributes: {
        novalidate: true,
      },
      events: {
        submit: async (event) => {
          event.preventDefault();

          let isFormValid = true;

          const values = Array.from(event.target).reduce(
            (acc: Record<string, string>, item: HTMLInputElement) => {
              if (item.tagName !== "INPUT") {
                return acc;
              }

              const { name, value } = item;
              if (value === "") {
                isFormValid = false;
              }
              return { ...acc, [name]: value };
            },
            {}
          );

          if (isFormValid) {
            alert("Cообщение отправлено");
          } else {
            alert("Cообщение пустое");
          }

          console.log(values);
        },
      },
    };

    super("form", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Form };
