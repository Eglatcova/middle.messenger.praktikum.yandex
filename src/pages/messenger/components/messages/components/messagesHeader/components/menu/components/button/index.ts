import { Block } from "../../../../../../../../../../services";
import { BaseBlockProps } from "../../../../../../../../../../services/types";
import { template } from "./button.tmpl";

interface ButtonProps extends BaseBlockProps {
  label: string;
  icon: string;
  isPopupOpen?: boolean;
  onClick: () => void;
}

class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    props.classNames = ["popup_button"];
    props.isPopupOpen = false;
    props.events = {
      click: props.onClick,
    };
    super("button", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Button };
