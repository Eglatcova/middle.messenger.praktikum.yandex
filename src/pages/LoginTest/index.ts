import { Block } from "../../utils";
import template from "./login.hbs";
import { ButtonBase } from "../../components/buttonBase";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import { SettingsInput } from "../../components/settingsInput";
import { SettingsItem } from "../../components/settingsItem";
import { ErrorBanner } from "../../components/errorBanner";
import { Title } from "../../components/title";
import { Avatar } from "../../components/avatar";
import checkmark from "../../../static/icons/file.svg";

class Login2 extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.buttonBase = new ButtonBase({
      label: "Авторизоваться",
      attributes: {
        type: "submit",
      },
    });

    this.children.input = new Input({
      id: "password_setup_1",
      label: "Новый пароль",
      type: "password",
      name: "password",
      placeholder: "Введите пароль",
    });

    this.children.link = new Link({
      label: "Нет аккаунта?",
      attributes: {
        href: "../registration/registration.hbs",
      },
    });

    this.children.settingsInput = new SettingsInput({
      id: "password_setup_1",
      label: "Новый пароль",
      type: "password",
      name: "password",
      value: "1234",
      placeholder: "Введите пароль",
    });

    this.children.settingsItem = new SettingsItem({
      label: "label",
      value: "value",
    });

    this.children.settingsItem = new ErrorBanner({
      code: "code",
      text: "text",
    });

    this.children.title = new Title({
      label: "label",
    });

    this.children.avatar = new Avatar({
      checkmark,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export { Login2 };
