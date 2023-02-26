import { SettingsInput, Avatar, ButtonBase } from "../../components";
import { Block } from "../../utils";
import template from "./profileSettings.hbs";
import checkmark from "../../../static/icons/file.svg";

class ProfileSettings extends Block {
  constructor() {
    const props = {
      classNames: ["page-wrapper", "profile"],
    };

    super("main", props);
  }

  init() {
    this.children.avatar = new Avatar({
      checkmark,
    });

    this.children.inputEmail = new SettingsInput({
      id: "email",
      label: "Почта",
      type: "email",
      name: "email",
      placeholder: "Введите почту",
      value: "pochta@yandex.ru",
    });

    this.children.inputLogin = new SettingsInput({
      id: "login",
      label: "Логин",
      type: "text",
      name: "login",
      placeholder: "Введите логин",
      value: "ivanivanov",
    });

    this.children.inputName = new SettingsInput({
      id: "name",
      label: "Имя",
      type: "text",
      name: "first_name",
      placeholder: "Введите имя",
      value: "Иван",
    });

    this.children.inputSurname = new SettingsInput({
      id: "surname",
      label: "Фамилия",
      type: "text",
      name: "surname",
      placeholder: "Введите фамилию",
      value: "Иванов",
    });

    this.children.inputTelephone = new SettingsInput({
      id: "tel",
      label: "Телефон",
      type: "tel",
      name: "tel",
      placeholder: "Введите телефон",
      value: "+7 (909) 967 30 30",
    });

    this.children.buttonBase = new ButtonBase({
      label: "Сохранить",
      classNames: ["profile-settings_button__submit"],
      attributes: {
        type: "submit",
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ProfileSettings };
