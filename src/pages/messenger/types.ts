import { ChatItem } from "../../services/Store/types";
import { BaseBlockProps } from "../../services/types";

export type MessengerConnectedProps = BaseBlockProps & {
  chats: ChatItem[];
  currentChat: ChatItem | null;
  currentChatID: number;
};

export interface MessengerProps extends MessengerConnectedProps {
  isPopupOpen: boolean;
  isLoaded: boolean;
}
