import { Block } from "../../utils";
import { SettingsInput } from "./components";
import template from "./settingsField.hbs";

interface SettingsFieldProps {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  pattern?: string;
  classNames?: string[];
}

class SettingsField extends Block {
  constructor(props: SettingsFieldProps) {
    props.classNames = ["settings-input_wrapper"];
    super("div", props);
  }

  init() {
    const { id, type, name, pattern, required, value = "" } = this.props;
    this.children.input = new SettingsInput({
      attributes: {
        id,
        type,
        name,
        pattern,
        required,
        value,
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export { SettingsField };
