import { Block } from "../../../../services";
import { BaseBlockProps } from "../../../../services/types";
import { Form } from "./components";
import template from "./popup.hbs";

interface PopupProps extends BaseBlockProps {
  inputLabel: string;
  onClose: () => void;
}

class Popup extends Block<PopupProps> {
  constructor(props: PopupProps) {
    const WRAPPER_CLASSNAME = "avatar_popup-wrapper";

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
      onClose: this.props.onClose,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Popup };
