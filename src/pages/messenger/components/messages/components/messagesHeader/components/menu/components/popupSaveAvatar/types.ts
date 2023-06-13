import { BaseBlockProps } from "../../../../../../../../../../services/types";

export interface PopupProps extends BaseBlockProps {
  chatID: number;
  inputLabel: string;
  onClose: () => void;
}
