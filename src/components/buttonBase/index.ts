import { Block } from "../../services";
import { BaseBlockProps } from "../../services/types";
import template from "./buttonBase.hbs";

interface ButtonBaseProps extends BaseBlockProps {
  label: string;
}

class ButtonBase extends Block<ButtonBaseProps> {
  constructor(props: ButtonBaseProps) {
    const { classNames } = props;

    if (classNames === undefined) {
      props.classNames = ["button-base"];
    } else {
      classNames.push("button-base");
    }

    super("button", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export { ButtonBase };
