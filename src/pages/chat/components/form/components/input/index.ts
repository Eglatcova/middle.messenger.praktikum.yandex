import { Block } from "../../../../../../utils";
import template from "./input.hbs";

interface InputProps {
  classNames?: string[];
  attributes: {
    id: string;
    type: string;
    name: string;
    pattern?: string;
    placeholder?: string;
  };
  events?: Record<string, (event: any) => void>;
}

class Input extends Block {
  constructor(props: InputProps) {
    props.classNames = ["chat_form-input"];

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
    return this.compile(template, { ...this.props });
  }
}

export { Input };
