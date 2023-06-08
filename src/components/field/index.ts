import { Block } from "../../services";
import { BaseBlockProps } from "../../services/types";
import { Input } from "./components";
import template from "./field.hbs";

interface FieldProps extends BaseBlockProps {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  errorMessage?: string;
  pattern?: string;
}

class Field extends Block<FieldProps> {
  constructor(props: FieldProps) {
    props.classNames = ["input_wrapper"];
    super("div", props);
  }

  init() {
    const { id, type, name, pattern, required } = this.props;
    this.children.input = new Input({
      attributes: {
        id,
        type,
        name,
        pattern,
        required,
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export { Field };
