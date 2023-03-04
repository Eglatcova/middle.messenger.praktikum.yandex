import { Block } from "../../../../utils";
import { Field, Title, ButtonBase } from "../../../../components";
import template from "./form.hbs";
import { Patterns } from "../../../../constants";

class Form extends Block {
  constructor() {
    const props = {
      classNames: ["registration_form"],
      attributes: {
        novalidate: true,
      },
      events: {
        submit: async (event) => {
          event.preventDefault();

          let isFormValid = true;
          let passwordFirstVariant: null | string = null;

          const values = Array.from(event.target).reduce(
            (acc: Record<string, string>, item: HTMLInputElement) => {
              if (item.tagName !== "INPUT") return acc;

              const { name, value, validity } = item;
              if (!validity.valid) {
                isFormValid = false;
              }

              if (name === "password") {
                if (passwordFirstVariant === null) {
                  passwordFirstVariant = value;
                } else if (passwordFirstVariant !== value) {
                  isFormValid = false;
                }
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
    this.children.title = new Title({
      label: "Регистрация",
    });

    this.children.fieldEmail = new Field({
      id: "email",
      label: "Почта",
      type: "email",
      name: "email",
      placeholder: "Введите почту",
      pattern: Patterns.EMAIL,
      required: true,
    });

    this.children.fieldLogin = new Field({
      id: "login",
      label: "Логин",
      type: "text",
      name: "login",
      placeholder: "Введите логин",
      pattern: Patterns.LOGIN,
      required: true,
    });

    this.children.fieldName = new Field({
      id: "name",
      label: "Имя",
      type: "text",
      name: "first_name",
      placeholder: "Введите имя",
      pattern: Patterns.NAME,
      required: true,
    });

    this.children.fieldSurname = new Field({
      id: "surname",
      label: "Фамилия",
      type: "text",
      name: "surname",
      placeholder: "Введите фамилию",
      pattern: Patterns.NAME,
      required: true,
    });

    this.children.fieldTelephone = new Field({
      id: "tel",
      label: "Телефон",
      type: "tel",
      name: "tel",
      placeholder: "Введите телефон",
      pattern: Patterns.PHONE,
      required: true,
    });

    this.children.fieldPassword1 = new Field({
      id: "password_step_1",
      label: "Пароль",
      type: "password",
      name: "password",
      placeholder: "Введите пароль",
      pattern: Patterns.PASSWORD,
      required: true,
    });

    this.children.fieldPassword2 = new Field({
      id: "password_step_2",
      label: "Пароль (ещё раз)",
      type: "password",
      name: "password",
      placeholder: "Введите пароль повторно",
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
