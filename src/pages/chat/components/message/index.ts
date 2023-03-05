import { Block } from "../../../../utils";
import { BaseBlockProps } from "../../../../utils/types";
import template from "./message.hbs";

interface MessageProps extends BaseBlockProps {
  text: string;
  time: string;
}

class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    props.classNames = ["chat_message"];

    super("p", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Message };
