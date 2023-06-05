import { Block } from "../../../../services";
import { setCurrentChat } from "../../../../services/Store/Actions";
import { ChatItem } from "../../../../services/Store/types";
import { BaseBlockProps } from "../../../../services/types";
import template from "./chat.hbs";

interface ContactProps extends BaseBlockProps, ChatItem {
  isActive: boolean;
}

class Chat extends Block<ContactProps> {
  constructor(props: ContactProps) {
    props.classNames = ["chat_item"];
    if (props.isActive) {
      props.classNames.push("chat_item__active");
    }
    props.events = {
      click: () => {
        setCurrentChat(props);
      },
    };

    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Chat };
