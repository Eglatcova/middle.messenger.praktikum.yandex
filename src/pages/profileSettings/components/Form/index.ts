/* eslint-disable @typescript-eslint/naming-convention */
import { Block } from "../../../../services";
import { ButtonBase, SettingsField } from "../../../../components";
import template from "./form.hbs";
import { Patterns, ValidationErrors } from "../../../../constants";
import { userController } from "../../../../controllers";
import { FormProps, FormIncomingProps } from "./types";

class Form extends Block<FormProps> {
  constructor(incomingProps: FormIncomingProps) {
    const props: FormProps = {
      classNames: ["profile-settings_form"],
      attributes: {
        novalidate: true,
      },
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          const formElement = event.target as HTMLFormElement;
          let isFormValid = true;

          const values = Array.from(formElement).reduce(
            (acc: Record<string, string>, item: HTMLElement) => {
              if (item.tagName !== "INPUT") return acc;

              const { name, value, validity } = item as HTMLInputElement;
              if (!validity.valid) {
                isFormValid = false;
              }
              return { ...acc, [name]: value };
            },
            {}
          );

          if (isFormValid) {
            console.log("values", values);

            const { login, first_name, second_name, phone, email } = values;

            userController.cheangeProfile({
              login,
              first_name,
              second_name,
              phone,
              email,
              display_name: login,
            });
            alert("Данные отправлены");
          } else {
            alert("Поля формы заполнены неправильно");
          }

          console.log(values);
        },
      },
      ...incomingProps,
    };

    super("form", props);
  }

  init() {
    this.children.fieldEmail = new SettingsField({
      id: "email",
      label: "Почта",
      type: "email",
      name: "email",
      placeholder: "Введите почту",
      pattern: Patterns.EMAIL,
      errorMessage: ValidationErrors.EMAIL,
      value: this.props.email,
      required: true,
    });

    this.children.fieldLogin = new SettingsField({
      id: "login",
      label: "Логин",
      type: "text",
      name: "login",
      placeholder: "Введите логин",
      pattern: Patterns.LOGIN,
      errorMessage: ValidationErrors.LOGIN,
      value: this.props.login,
      required: true,
    });

    this.children.fieldName = new SettingsField({
      id: "name",
      label: "Имя",
      type: "text",
      name: "first_name",
      placeholder: "Введите имя",
      pattern: Patterns.NAME,
      errorMessage: ValidationErrors.NAME,
      value: this.props.first_name,
      required: true,
    });

    this.children.fieldSurname = new SettingsField({
      id: "surname",
      label: "Фамилия",
      type: "text",
      name: "second_name",
      placeholder: "Введите фамилию",
      pattern: Patterns.NAME,
      errorMessage: ValidationErrors.SURNAME,
      value: this.props.second_name,
      required: true,
    });

    this.children.fieldTelephone = new SettingsField({
      id: "tel",
      label: "Телефон",
      type: "tel",
      name: "phone",
      placeholder: "Введите телефон",
      pattern: Patterns.PHONE,
      errorMessage: ValidationErrors.PHONE,
      value: this.props.phone,
      required: true,
    });

    this.children.button = new ButtonBase({
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

export { Form };
