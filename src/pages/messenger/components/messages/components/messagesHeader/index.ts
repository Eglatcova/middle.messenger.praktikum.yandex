import { Connect } from "../../../../../../services";
import { State } from "../../../../../../services/Store/types";
import { MessagesHeaderView } from "./messagesHeader";
import { MessagesHeaderConnectedProps as ConnectedProps } from "./types";

const mapStateToProps = (state: State): ConnectedProps => {
  const { currentChat } = state.chat;

  if (currentChat === null) {
    return {
      id: 0,
      avatar: "",
      label: "",
    };
  }

  return {
    id: currentChat.id,
    avatar: currentChat.avatar || "",
    label: currentChat.title,
  };
};

// eslint-disable-next-line operator-linebreak
const MessagesHeader =
  Connect<ConnectedProps>(mapStateToProps)(MessagesHeaderView);

export { MessagesHeader };
