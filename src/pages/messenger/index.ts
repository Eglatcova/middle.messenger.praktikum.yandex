import { Connect } from "../../services";
import { State } from "../../services/Store/types";
import { MessengerView } from "./messenger";
import { MessengerConnectedProps as ConnectedProps } from "./types";

const mapStateToProps = (state: State): ConnectedProps => ({
  currentChat: state.chat.currentChat,
  currentChatID: state.chat.currentChatID,
  chats: state.chat.chats || [],
});

const Messenger = Connect<ConnectedProps>(mapStateToProps)(MessengerView);

export { Messenger };
