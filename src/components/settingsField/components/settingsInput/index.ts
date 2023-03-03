import { Block } from "../../../../utils";
import template from "./settingsInput.hbs";

interface SettingsInputProps {
  classNames?: string[];
  attributes: {
    id: string;
    type: string;
    name: string;
    required: string;
    value: string;
    pattern?: string;
    placeholder?: string;
  };
  events?: Record<string, (event: any) => void>;
}

class SettingsInput extends Block {
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
    return this.compile(template, { ...this.props });
  }
}

export { SettingsInput };
