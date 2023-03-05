import { Block } from "../../../../utils";
import { BaseBlockProps } from "../../../../utils/types";
import template from "./contact.hbs";

interface ContactProps extends BaseBlockProps {
  name: string;
  message: string;
  time: string;
  messagesNumber: number;
}

class Contact extends Block<ContactProps> {
  constructor(props: ContactProps) {
    props.classNames = ["chat_contact"];

    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Contact };
