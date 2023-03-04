import { Block } from "../../../../utils";
import template from "./message.hbs";

interface MessageProps {
  text: string;
  time: string;
  classNames?: string[];
}

class Message extends Block {
  constructor(props: MessageProps) {
    props.classNames = ["chat_message"];

    super("p", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Message };
