import { Block } from "../../../../../../services";
import arrowBigIcon from "../../../../../../../static/icons/arrowBig.svg";
import template from "./form.hbs";
import {
  getCurrentChat,
  getSockets,
} from "../../../../../../services/Store/Actions";

class Form extends Block {
  constructor() {
    const props = {
      classNames: ["chat_form"],
      arrowBigIcon,
      attributes: {
        novalidate: true,
      },
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          const formElement = event.target as HTMLFormElement;
          let isFormValid = true;

          const values = Array.from(formElement).reduce(
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
            const currentChat = getCurrentChat();
            const sockets = getSockets();

            if (currentChat !== null) {
              const currentSocket = sockets[currentChat.id];
              currentSocket.send(
                JSON.stringify({
                  content: values.message,
                  type: "message",
                })
              );

              Array.from(formElement).forEach((item: HTMLInputElement) => {
                if (item.tagName !== "INPUT") {
                  return;
                }

                item.value = "";
              });
            }
          } else {
            alert("Cообщение пустое");
          }
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
