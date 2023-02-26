import { Block } from "../../utils";
import template from "./settingsInput.hbs";

interface SettingsInputProps {
  id: string;
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  classNames?: string[];
}

class SettingsInput extends Block {
  constructor(props: SettingsInputProps) {
    console.log("iii");
    props.classNames = ["settings-input_wrapper"];
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export { SettingsInput };
