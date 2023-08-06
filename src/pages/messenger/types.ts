import { ChatItem } from "../../services/Store/types";
import { BaseBlockProps } from "../../services/types";

export type MessengerConnectedProps = {
  chats: ChatItem[];
  currentChat: ChatItem | null;
  currentChatID: number;
};

export interface MessengerProps
  extends MessengerConnectedProps,
    BaseBlockProps {
  isPopupOpen: boolean;
  isLoaded: boolean;
}
