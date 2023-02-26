import { Block } from "../../utils";
import template from "./settingsContainer.hbs";

interface SettingsContainerProps {
  classNames?: string[];
}

class SettingsContainer extends Block {
  constructor(props: SettingsContainerProps) {
    const { classNames } = props;

    if (classNames === undefined) {
      props.classNames = ["settings-container"];
    } else {
      classNames.push("settings-container");
    }

    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export { SettingsContainer };
