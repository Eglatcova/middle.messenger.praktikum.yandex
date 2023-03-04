import { Block } from "../../../../utils";
import template from "./contact.hbs";

interface ContactProps {
  name: string;
  message: string;
  time: string;
  messagesNumber: number;
  classNames?: string[];
}

class Contact extends Block {
  constructor(props: ContactProps) {
    props.classNames = ["chat_contact"];

    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Contact };
