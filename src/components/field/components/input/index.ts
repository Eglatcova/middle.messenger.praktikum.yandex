import { Block } from "../../../../services";
import { BaseBlockProps } from "../../../../services/types";

interface InputProps extends BaseBlockProps {
  attributes: {
    id: string;
    type: string;
    name: string;
    required?: boolean;
    pattern?: string;
    placeholder?: string;
  };
}

class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    props.classNames = ["input_input"];

    props.events = {
      focus: () => {
        const elem = this.element as HTMLInputElement;
        elem.classList.remove("invalid");
      },
      blur: () => {
        const elem = this.element as HTMLInputElement;
        const isValid = elem.checkValidity();

        if (!isValid) {
          elem.classList.add("invalid");
        }
      },
    };

    super("input", props);
  }

  render() {
    return this.compile("", { ...this.props });
  }
}

export { Input };
