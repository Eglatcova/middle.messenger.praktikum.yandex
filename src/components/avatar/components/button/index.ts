import { Block } from "../../../../services";
import { BaseBlockProps } from "../../../../services/types";
import template from "./button.hbs";

interface ButtonBaseProps extends BaseBlockProps {
  label: string;
}

class Button extends Block<ButtonBaseProps> {
  constructor(props: ButtonBaseProps) {
    props.classNames = ["avatar_button"];

    super("button", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export { Button };
