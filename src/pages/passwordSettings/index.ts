import { Avatar, ButtonBase } from "../../components";
import { Block } from "../../services";
import { BaseBlockProps } from "../../services/types";
import fileIcon from "../../../static/icons/file.svg";
import { Form } from "./components";
import { template } from "./passwordSettings.tmpl";

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
      avatar: null,
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
