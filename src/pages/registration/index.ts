import { Input, Title, ButtonBase, Link } from "../../components";
import { Block } from "../../utils";
import template from "./registration.hbs";

class Registration extends Block {
  constructor() {
    const props = {
      classNames: ["page-wrapper"],
    };

    super("main", props);
  }

  init() {
    this.children.title = new Title({
      label: "Регистрация",
    });

    this.children.inputEmail = new Input({
      id: "email",
      label: "Почта",
      type: "email",
      name: "email",
      placeholder: "Введите почту",
    });

    this.children.inputLogin = new Input({
      id: "login",
      label: "Логин",
      type: "text",
      name: "login",
      placeholder: "Введите логин",
    });

    this.children.inputName = new Input({
      id: "name",
      label: "Имя",
      type: "text",
      name: "first_name",
      placeholder: "Введите имя",
    });

    this.children.inputSurname = new Input({
      id: "surname",
      label: "Фамилия",
      type: "text",
      name: "surname",
      placeholder: "Введите фамилию",
    });

    this.children.inputTelephone = new Input({
      id: "tel",
      label: "Телефон",
      type: "tel",
      name: "tel",
      placeholder: "Введите телефон",
    });

    this.children.inputPasswordStep1 = new Input({
      id: "password_step_1",
      label: "Пароль",
      type: "password",
      name: "password",
      placeholder: "Введите пароль",
    });

    this.children.inputPasswordStep2 = new Input({
      id: "password_step_2",
      label: "Пароль (ещё раз)",
      type: "password",
      name: "password",
      placeholder: "Введите пароль повторно",
    });

    this.children.button = new ButtonBase({
      label: "Зарегистрироваться",
      classNames: ["registration_button__submit"],
      attributes: {
        type: "submit",
      },
    });

    this.children.link = new Link({
      label: "Войти",
      events: {
        click: () => {
          console.log("route");
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Registration };
