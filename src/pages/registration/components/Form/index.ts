import { Block } from "../../../../services";
import { BaseBlockProps } from "../../../../services/types";
import { Field, Title, ButtonBase } from "../../../../components";
import template from "./form.hbs";
import { Patterns, ValidationErrors } from "../../../../constants";
import { authController } from "../../../../controllers";
import { SignupData } from "../../../../api/AuthAPI";

class Form extends Block {
  constructor() {
    const props: BaseBlockProps = {
      classNames: ["registration_form"],
      attributes: {
        novalidate: true,
      },
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          const formElements = event.target as HTMLFormElement;
          let isFormValid = true;
          let passwordFirstVariant: null | string = null;

          const values = Array.from(formElements).reduce(
            (acc, item: HTMLElement) => {
              if (item.tagName !== "INPUT") return acc;

              const { name, value, validity } = item as HTMLInputElement;
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
            {} as SignupData
          );

          if (isFormValid) {
            authController.signup(values);
            alert("Данные отправлены");
          } else {
            alert("Поля формы заполнены неправильно");
          }
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
      errorMessage: ValidationErrors.EMAIL,
      required: true,
    });

    this.children.fieldLogin = new Field({
      id: "login",
      label: "Логин",
      type: "text",
      name: "login",
      placeholder: "Введите логин",
      pattern: Patterns.LOGIN,
      errorMessage: ValidationErrors.LOGIN,
      required: true,
    });

    this.children.fieldName = new Field({
      id: "name",
      label: "Имя",
      type: "text",
      name: "first_name",
      placeholder: "Введите имя",
      pattern: Patterns.NAME,
      errorMessage: ValidationErrors.NAME,
      required: true,
    });

    this.children.fieldSurname = new Field({
      id: "surname",
      label: "Фамилия",
      type: "text",
      name: "second_name",
      placeholder: "Введите фамилию",
      pattern: Patterns.NAME,
      errorMessage: ValidationErrors.SURNAME,
      required: true,
    });

    this.children.fieldTelephone = new Field({
      id: "tel",
      label: "Телефон",
      type: "tel",
      name: "phone",
      placeholder: "Введите телефон",
      pattern: Patterns.PHONE,
      errorMessage: ValidationErrors.PHONE,
      required: true,
    });

    this.children.fieldPassword1 = new Field({
      id: "password_step_1",
      label: "Пароль",
      type: "password",
      name: "password",
      placeholder: "Введите пароль",
      pattern: Patterns.PASSWORD,
      errorMessage: ValidationErrors.PASSWORD,
      required: true,
    });

    this.children.fieldPassword2 = new Field({
      id: "password_step_2",
      label: "Пароль (ещё раз)",
      type: "password",
      name: "password",
      placeholder: "Введите пароль повторно",
      pattern: Patterns.PASSWORD,
      errorMessage: ValidationErrors.PASSWORD,
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
