import { Block } from "../../services";
import { Form } from "./components";
import template from "./popup.hbs";
import { PopupProps } from "./types";

class Popup extends Block<PopupProps> {
  constructor(props: PopupProps) {
    const WRAPPER_CLASSNAME = "popup_wrapper";
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
