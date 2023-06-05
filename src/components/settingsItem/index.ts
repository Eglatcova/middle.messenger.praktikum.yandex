import { Block } from "../../services";
import template from "./settingsItem.hbs";

interface SettingsItemProps {
  label: string;
  value: string;
  classNames?: string[];
}

class SettingsItem extends Block<SettingsItemProps> {
  constructor(props: SettingsItemProps) {
    props.classNames = ["item"];
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export { SettingsItem };
