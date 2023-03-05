import { Avatar, ButtonBase } from "../../components";
import { Block } from "../../utils";
import template from "./passwordSettings.hbs";
import fileIcon from "../../../static/icons/file.svg";
import { Form } from "./components";
import { BaseBlockProps } from "../../utils/types";

class PasswordSettings extends Block {
  constructor() {
    const props: BaseBlockProps = {
      classNames: ["page-wrapper"],
    };

    super("main", props);
  }

  init() {
    this.children.avatar = new Avatar({
      icon: fileIcon,
    });

    this.children.form = new Form();

    this.children.buttonBase = new ButtonBase({
      label: "Сохранить",
      classNames: ["password-settings_button__submit"],
      attributes: {
        type: "submit",
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { PasswordSettings };
