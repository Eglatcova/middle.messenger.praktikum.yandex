import { Block } from "../../../../utils";
import { ButtonBase, Field, SettingsField } from "../../../../components";
import template from "./form.hbs";
import { Patterns } from "../../../../constants";

class Form extends Block {
  constructor() {
    const props = {
      classNames: ["password-settings_form"],
      attributes: {
        novalidate: true,
      },
      events: {
        submit: async (event) => {
          event.preventDefault();

          let isFormValid = true;
          let passwordFirstVariant: null | string = null;

          const values = Array.from(event.target).reduce(
            (acc: Record<string, string>, item: HTMLElement) => {
              if (item.tagName !== "INPUT") return acc;

              const { id, name, value, validity } = item as HTMLInputElement;
              if (!validity.valid) {
                isFormValid = false;
              }

              const isValueOfNewPassord =
                name === "password" && id !== "old_password";

              if (isValueOfNewPassord) {
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
    this.children.filedOldPassword = new SettingsField({
      id: "old_password",
      label: "Старый пароль",
      type: "password",
      name: "password",
      pattern: Patterns.PASSWORD,
      required: true,
    });

    this.children.fieldNewPassword1 = new SettingsField({
      id: "password_step_1",
      label: "Новый пароль",
      type: "password",
      name: "password",
      pattern: Patterns.PASSWORD,
      required: true,
    });

    this.children.fieldNewPassword2 = new SettingsField({
      id: "password_step_2",
      label: "Повторите новый пароль",
      type: "password",
      name: "password",
      pattern: Patterns.PASSWORD,
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
