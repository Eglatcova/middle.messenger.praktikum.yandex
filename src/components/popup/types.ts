import { BaseBlockProps } from "../../services/types";

export interface PopupProps extends BaseBlockProps {
  label: string;
  inputLabel: string;
  onSubmit: (login: string) => void;
  onClose: () => void;
}
