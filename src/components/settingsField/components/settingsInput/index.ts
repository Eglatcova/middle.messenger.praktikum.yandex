import { Block } from "../../../../services";
import { BaseBlockProps } from "../../../../services/types";

interface SettingsInputProps extends BaseBlockProps {
  attributes: {
    id: string;
    type: string;
    name: string;
    value: string;
    required?: boolean;
    pattern?: string;
    placeholder?: string;
  };
}

class SettingsInput extends Block<SettingsInputProps> {
  constructor(props: SettingsInputProps) {
    props.classNames = ["settings-input_input"];

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

export { SettingsInput };
