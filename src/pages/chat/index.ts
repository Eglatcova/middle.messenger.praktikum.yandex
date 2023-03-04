import { Block } from "../../utils";
import template from "./chat.hbs";
import { Contact, Form, Message, MessagesHeader } from "./components";
import { Link } from "../../components";
import { goTo } from "../../helpers";

class Chat extends Block {
  constructor() {
    const props = {
      classNames: ["chat_wrapper"],
      name: "Вадим",
    };

    super("main", props);
  }

  init() {
    this.children.linkProfile = new Link({
      label: "Профайл",
      events: {
        click: () => {
          goTo("profile");
        },
      },
    });

    this.children.contact1 = new Contact({
      name: "Андрей",
      message: "Изображение",
      time: "10:49",
      messagesNumber: 2,
    });

    this.children.contact2 = new Contact({
      name: "Андрей",
      message:
        "Съешь ещё этих мягких французских булок, да выпей же чаю. Съешь ещё этих мягких французских булок, да выпей же чаю. Съешь ещё этих мягких французских булок, да выпей же чаю.",
      time: "10:49",
      messagesNumber: 0,
    });

    this.children.messagesHeader = new MessagesHeader({
      name: "Вадим",
    });

    this.children.form = new Form();

    this.children.message = new Message({
      text: "Съешь ещё этих мягких французских булок, да выпей же чаю. Съешь ещё этих мягких французских булок, да выпей же чаю. Съешь ещё этих мягких французских булок, да выпей же чаю.",
      time: "11:56",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Chat };
