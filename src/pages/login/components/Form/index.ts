import { Block } from "../../../../services";
import { BaseBlockProps } from "../../../../services/types";
import { template } from "./form.tmpl";
import { Patterns, ValidationErrors } from "../../../../constants";
import { ButtonBase, Field } from "../../../../components";
import { authController } from "../../../../controllers";
import { PostSigninData } from "../../../../api/AuthAPI/types";

class Form extends Block {
  constructor() {
    const props: BaseBlockProps = {
      tagName: "form",
      classNames: ["login_form"],
      attributes: {
        novalidate: true,
      },
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          const formElement = event.target as HTMLFormElement;
          let isFormValid = true;

          const values = Array.from(formElement).reduce(
            (acc, item: HTMLElement) => {
              if (item.tagName !== "INPUT") return acc;

              const { name, value, validity } = item as HTMLInputElement;
              if (!validity.valid) {
                isFormValid = false;
              }
              return { ...acc, [name]: value };
            },
            {} as PostSigninData
          );

          if (isFormValid) {
            authController.signin(values);
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

    this.children.fieldPassword = new Field({
      id: "password_step_1",
      label: "Пароль",
      type: "password",
      name: "password",
      placeholder: "Введите пароль",
      pattern: Patterns.PASSWORD,
      errorMessage: ValidationErrors.PASSWORD,
      required: true,
    });

    this.children.button = new ButtonBase({
      label: "Авторизоваться",
      classNames: ["login_button__submit"],
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
