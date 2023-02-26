import { Block } from "../../utils";
import template from "./input.hbs";

interface InputProps {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder: string;
  classNames?: string[];
}

class Input extends Block {
  constructor(props: InputProps) {
    props.classNames = ["input_wrapper"];
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export { Input };
