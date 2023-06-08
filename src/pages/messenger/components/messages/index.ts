import { isEqual } from "../../../../helpers";
import { Block, Connect } from "../../../../services";
import { MessageItem, State } from "../../../../services/Store/types";
import { BaseBlockProps } from "../../../../services/types";
import { Form, MessagesHeader, Message } from "./components";
import template from "./messages.hbs";

interface MessagesConnectedProps {
  messages: MessageItem[];
}

interface MessagesProps extends BaseBlockProps, MessagesConnectedProps {}

class MessagesView extends Block<MessagesProps> {
  constructor(_: string, connectedProps: MessagesConnectedProps) {
    const props = {
      classNames: ["messages"],
      ...connectedProps,
    };

    super("div", props);
  }

  init() {
    this.children.messagesHeader = new MessagesHeader("", {
      id: 0,
      avatar: "",
      label: "",
    });

    this.children.message = this.props.messages.map((message) => {
      const { content, time, userName } = message;
      return new Message({
        text: content,
        time,
        login: userName,
      });
    });

    this.children.form = new Form();
  }

  componentDidUpdate(
    oldProps: MessagesProps,
    newProps: MessagesProps
  ): boolean {
    this.children.message = this.props.messages.map(
      ({ content, time, userName }) =>
        new Message({
          text: content,
          time,
          login: userName,
        })
    );

    return !isEqual(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const mapStateToProps = (state: State): MessagesConnectedProps => {
  const { currentChat, messages } = state.chat;
  if (currentChat === null || messages[currentChat.id] === undefined) {
    return {
      messages: [] as MessageItem[],
    };
  }

  return { messages: messages[currentChat.id] };
};

const Messages = Connect<MessagesConnectedProps>(mapStateToProps)(MessagesView);

export { Messages };
