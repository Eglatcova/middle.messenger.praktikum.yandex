import { Avatar, SettingsItem, Link, Title } from "../../components";
import { Block, Connect, Router } from "../../services";
import template from "./profile.hbs";
import fileIcon from "../../../static/icons/file.svg";
import { Routes } from "../../constants";
import { authController } from "../../controllers";
import { ProfileConnectedProps } from "./types";
import { State } from "../../services/Store/types";

class ProfilePage extends Block<ProfileConnectedProps> {
  constructor(_: string, user: ProfileConnectedProps) {
    const props = {
      classNames: ["page-wrapper"],
      ...user,
    };

    super("main", props);
  }

  init() {
    this.children.avatar = new Avatar({
      icon: fileIcon,
      avatar: this.props.avatar,
    });

    this.children.title = new Title({
      label: this.props.first_name,
      classNames: ["profile_name"],
    });

    this.children.itemEmail = new SettingsItem({
      label: "Почта",
      value: this.props.email,
    });

    this.children.itemLogin = new SettingsItem({
      label: "Логин",
      value: this.props.login,
    });

    this.children.itemName = new SettingsItem({
      label: "Имя",
      value: this.props.first_name,
    });

    this.children.itemSurname = new SettingsItem({
      label: "Фамилия",
      value: this.props.second_name,
    });

    this.children.itemTelephone = new SettingsItem({
      label: "Телефон",
      value: this.props.phone,
    });

    this.children.linkToMessenger = new Link({
      label: "Перейти в чат",
      events: {
        click: () => {
          Router.go(Routes.MESSENGER);
        },
      },
    });

    this.children.linkToProfileSettings = new Link({
      label: "Изменить данные",
      events: {
        click: () => {
          Router.go(Routes.PROFILE_SETTIGS);
        },
      },
    });

    this.children.linkToPasswordSettings = new Link({
      label: "Изменить пароль",
      events: {
        click: () => {
          Router.go(Routes.PASSWORD_SETTINGS);
        },
      },
    });

    this.children.linkLogout = new Link({
      label: "Выйти",
      events: {
        click: () => {
          authController.logout();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const getUserData = (state: State) => state.user.data;

const Profile = Connect<ProfileConnectedProps>(getUserData)(ProfilePage);

export { Profile };
