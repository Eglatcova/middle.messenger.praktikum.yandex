import { ButtonBase } from "../../../../../../../../../../../../components";
import { chatController } from "../../../../../../../../../../../../controllers";
import { Block } from "../../../../../../../../../../../../services";
import template from "./form.hbs";

interface FormProps {
  chatID: number;
  label: string;
  onClose: () => void;
}

class Form extends Block<FormProps> {
  constructor(incomingProps: FormProps) {
    const props = {
      classNames: ["avatar-popup_form"],
      attributes: {
        novalidate: true,
      },
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          const inputWithFile = document.getElementById("avatar");
          if (inputWithFile === null) return;

          const { files } = inputWithFile as HTMLInputElement;
          if (files === null) return;

          const file = files[0];

          if (file === undefined) {
            alert("Файл не выбран");
            return;
          }

          const form = new FormData();
          form.append("avatar", file);
          form.append("chatId", incomingProps.chatID.toString());

          chatController.updateAvatar(form);
          incomingProps.onClose();
        },
      },
      ...incomingProps,
    };

    super("form", props);
  }

  init() {
    this.children.buttonBase = new ButtonBase({
      label: "Поменять",
      attributes: {
        type: "submit",
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Form };
