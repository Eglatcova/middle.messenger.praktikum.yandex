import { SettingsInput, Avatar, ButtonBase } from "../../components";
import { Block } from "../../utils";
import template from "./passwordSettings.hbs";
import checkmark from "../../../static/icons/file.svg";

class PasswordSettings extends Block {
  constructor() {
    const props = {
      classNames: ["page-wrapper"],
    };

    super("main", props);
  }

  init() {
    this.children.avatar = new Avatar({
      checkmark,
    });

    this.children.inputPasswordStep1 = new SettingsInput({
      id: "password_step_1",
      label: "Новый пароль",
      type: "password",
      name: "password",
      placeholder: "Введите пароль",
      value: "xxxxxxxx",
    });

    this.children.inputPasswordStep2 = new SettingsInput({
      id: "password_step_2",
      label: "Повторите новый пароль",
      type: "password",
      name: "password",
      placeholder: "Введите пароль",
      value: "xxxxxxxx",
    });

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
