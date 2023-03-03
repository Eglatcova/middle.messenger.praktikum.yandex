import { Block } from "../../../../utils";
import { ButtonBase, SettingsField } from "../../../../components";
import template from "./form.hbs";
import { Patterns } from "../../../../constants";

class Form extends Block {
  constructor() {
    const props = {
      classNames: ["profile-settings_form"],
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
    this.children.fieldEmail = new SettingsField({
      id: "email",
      label: "Почта",
      type: "email",
      name: "email",
      placeholder: "Введите почту",
      pattern: Patterns.EMAIL,
      value: "pochta@yandex.ru",
      required: true,
    });

    this.children.fieldLogin = new SettingsField({
      id: "login",
      label: "Логин",
      type: "text",
      name: "login",
      placeholder: "Введите логин",
      pattern: Patterns.LOGIN,
      value: "ivanivanov",
      required: true,
    });

    this.children.fieldName = new SettingsField({
      id: "name",
      label: "Имя",
      type: "text",
      name: "first_name",
      placeholder: "Введите имя",
      pattern: Patterns.NAME,
      value: "Иван",
      required: true,
    });

    this.children.fieldSurname = new SettingsField({
      id: "surname",
      label: "Фамилия",
      type: "text",
      name: "surname",
      placeholder: "Введите фамилию",
      pattern: Patterns.NAME,
      value: "Иванов",
      required: true,
    });

    this.children.fieldTelephone = new SettingsField({
      id: "tel",
      label: "Телефон",
      type: "tel",
      name: "tel",
      placeholder: "Введите телефон",
      pattern: Patterns.PHONE,
      value: "+7 (909) 967 30 30",
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
