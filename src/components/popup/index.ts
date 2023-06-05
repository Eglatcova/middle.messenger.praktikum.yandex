import { Block } from "../../services";
import { BaseBlockProps } from "../../services/types";
import { Form } from "./components";
import template from "./popup.hbs";

interface PopupProps extends BaseBlockProps {
  label: string;
  inputLabel: string;
  onSubmit: (login: string) => void;
  onClose: () => void;
}

class Popup extends Block<PopupProps> {
  constructor(props: PopupProps) {
    const WRAPPER_CLASSNAME = "popup__wrapper";
    props.classNames = [WRAPPER_CLASSNAME];
    props.events = {
      click: (e) => {
        const className = (e.target as HTMLElement)?.getAttribute("class");
        if (className === WRAPPER_CLASSNAME) {
          props.onClose();
        }
      },
    };
    super("div", props);
  }

  protected init(): void {
    this.children.form = new Form({
      label: this.props.inputLabel,
      onSubmit: this.props.onSubmit,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Popup };
