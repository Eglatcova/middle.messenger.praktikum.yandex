import { Block } from "../../../../services";
import { template } from "./form.tmpl";
import { Patterns, ValidationErrors } from "../../../../constants";
import { Field } from "../../../field";
import { ButtonBase } from "../../../buttonBase";

interface FormProps {
  label: string;
  onSubmit: (login: string) => void;
}

class Form extends Block<FormProps> {
  constructor(incomingProps: FormProps) {
    const props = {
      classNames: ["popup_form"],
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
            incomingProps.onSubmit(values.login);
            alert("Данные отправлены");
          } else {
            alert("Поля формы заполнены неправильно");
          }
        },
      },
      ...incomingProps,
    };

    super("form", props);
  }

  init() {
    this.children.input = new Field({
      id: "popup-field",
      label: this.props.label,
      type: "text",
      name: "login",
      placeholder: "Введите логин",
      pattern: Patterns.LOGIN,
      errorMessage: ValidationErrors.LOGIN,
      required: true,
    });

    this.children.buttonBase = new ButtonBase({
      label: "Отправить",
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
