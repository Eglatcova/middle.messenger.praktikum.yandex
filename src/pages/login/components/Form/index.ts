import { Block } from "../../../../utils";
import template from "./form.hbs";
import { Patterns } from "../../../../constants";
import { ButtonBase, Field } from "../../../../components";

class Form extends Block {
  constructor() {
    const props = {
      classNames: ["login_form"],
      attributes: {
        novalidate: true,
      },
      events: {
        submit: async (event) => {
          event.preventDefault();

          let isFormValid = true;

          const values = Array.from(event.target).reduce(
            (acc: Record<string, string>, item: HTMLElement) => {
              if (item.tagName === "BUTTON") return acc;

              const { name, value, validity } = item as HTMLInputElement;
              if (!validity.valid) {
                isFormValid = false;
              }
              return { ...acc, [name]: value };
            },
            {}
          );

          if (isFormValid) {
            alert("Данные отправлены");
          } else {
            alert("Поля формы заполнены неправильно");
          }

          console.log(values);
        },
      },
    };

    super("form", props);
  }

  init() {
    this.children.fieldLogin = new Field({
      id: "login",
      label: "Логин",
      type: "text",
      name: "login",
      placeholder: "Введите логин",
      pattern: Patterns.LOGIN,
      required: true,
    });

    this.children.fieldPassword = new Field({
      id: "password_step_1",
      label: "Пароль",
      type: "password",
      name: "password",
      placeholder: "Введите пароль",
      pattern: Patterns.PASSWORD,
      required: true,
    });

    this.children.button = new ButtonBase({
      label: "Зарегистрироваться",
      classNames: ["registration_button__submit"],
      attributes: {
        type: "submit",
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Form };
