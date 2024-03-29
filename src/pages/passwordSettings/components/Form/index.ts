import { Block } from "../../../../services";
import { BaseBlockProps } from "../../../../services/types";
import { ButtonBase, SettingsField } from "../../../../components";
import template from "./form.hbs";
import { Patterns, ValidationErrors } from "../../../../constants";
import { userController } from "../../../../controllers";

class Form extends Block {
  constructor() {
    const props: BaseBlockProps = {
      classNames: ["password-settings_form"],
      attributes: {
        novalidate: true,
      },
      events: {
        submit: async (event: Event) => {
          event.preventDefault();

          const formElement = event.target as HTMLFormElement;
          let isFormValid = true;
          let passwordFirstVariant: null | string = null;

          const values = Array.from(formElement).reduce(
            (acc: Record<string, string>, item: HTMLElement) => {
              if (item.tagName !== "INPUT") return acc;

              const { name, value, validity } = item as HTMLInputElement;
              if (!validity.valid) {
                isFormValid = false;
              }

              const isNewPassord = name === "newPassword";

              if (isNewPassord) {
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
            userController.cheangePassword({
              oldPassword: values.oldPassword,
              newPassword: values.newPassword,
            });
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
    this.children.filedOldPassword = new SettingsField({
      id: "old_password",
      label: "Старый пароль",
      type: "password",
      name: "oldPassword",
      pattern: Patterns.PASSWORD,
      errorMessage: ValidationErrors.PASSWORD,
      required: true,
    });

    this.children.fieldNewPassword1 = new SettingsField({
      id: "password_step_1",
      label: "Новый пароль",
      type: "password",
      name: "newPassword",
      pattern: Patterns.PASSWORD,
      errorMessage: ValidationErrors.PASSWORD,
      required: true,
    });

    this.children.fieldNewPassword2 = new SettingsField({
      id: "password_step_2",
      label: "Повторите новый пароль",
      type: "password",
      name: "newPassword",
      pattern: Patterns.PASSWORD,
      errorMessage: ValidationErrors.PASSWORD,
      required: true,
    });

    this.children.button = new ButtonBase({
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

export { Form };
