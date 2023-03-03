import { Block } from "../../utils";
import template from "./buttonBase.hbs";

interface ButtonBaseAttributes {
  type: string;
}

interface ButtonBaseProps {
  label: string;
  attributes: ButtonBaseAttributes;
  events?: Record<string, (event: Event) => void>;
  classNames?: string[];
}

class ButtonBase extends Block {
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
