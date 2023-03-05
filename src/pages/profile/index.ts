import { Avatar, SettingsItem, Link, Title } from "../../components";
import { Block } from "../../utils";
import template from "./profile.hbs";
import fileIcon from "../../../static/icons/file.svg";
import { goTo } from "../../helpers";
import { BaseBlockProps } from "../../utils/types";

class Profile extends Block {
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

    this.children.title = new Title({
      label: "Иван",
      classNames: ["profile_name"],
    });

    this.children.itemEmail = new SettingsItem({
      label: "Почта",
      value: "pochta@yandex.ru",
    });

    this.children.itemLogin = new SettingsItem({
      label: "Логин",
      value: "ivanivanov",
    });

    this.children.itemName = new SettingsItem({
      label: "Имя",
      value: "Иван",
    });

    this.children.itemSurname = new SettingsItem({
      label: "Фамилия",
      value: "Иванов",
    });

    this.children.itemTelephone = new SettingsItem({
      label: "Телефон",
      value: "+7 (909) 967 30 30",
    });

    this.children.linkToProfileSettings = new Link({
      label: "Изменить данные",
      events: {
        click: () => {
          goTo("profileSettings");
        },
      },
    });

    this.children.linkToPasswordSettings = new Link({
      label: "Изменить пароль",
      events: {
        click: () => {
          goTo("passwordSettings");
        },
      },
    });

    this.children.linkLogout = new Link({
      label: "Выйти",
      events: {
        click: () => {
          console.log("выход");
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Profile };
