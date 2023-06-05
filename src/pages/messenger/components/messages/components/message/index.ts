import { Block } from "../../../../../../services";
import { BaseBlockProps } from "../../../../../../services/types";
import template from "./message.hbs";

interface MessageProps extends BaseBlockProps {
  text: string;
  time: string;
  login: string;
}

class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    props.classNames = ["chat_message"];
    props.time = new Date(props.time).toLocaleString();
    super("p", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Message };
