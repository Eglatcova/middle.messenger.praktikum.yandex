import { BaseBlockProps } from "../../../../../../services/types";

export interface MessagesHeaderConnectedProps {
  id: number;
  avatar: string;
  label: string;
}

export interface MessagesHeaderProps
  extends BaseBlockProps,
    MessagesHeaderConnectedProps {
  label: string;
  isModalOpen: boolean;
  dotsIcon: string;
}
