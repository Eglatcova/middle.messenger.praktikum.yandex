import { Block } from "../../services";
import { BaseBlockProps } from "../../services/types";
import { SettingsInput } from "./components";
import template from "./settingsField.hbs";

interface SettingsFieldProps extends BaseBlockProps {
  id: string;
  label: string;
  type: string;
  name: string;
  pattern: string;
  errorMessage: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
}

class SettingsField extends Block<SettingsFieldProps> {
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
