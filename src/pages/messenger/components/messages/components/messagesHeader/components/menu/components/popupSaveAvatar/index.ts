import { Block } from "../../../../../../../../../../services";
import { Form } from "./components";
import { PopupProps } from "./types";
import template from "./popupSaveAvatar.hbs";

class PopupSaveAvatar extends Block<PopupProps> {
  constructor(props: PopupProps) {
    const WRAPPER_CLASSNAME = "popup-avatar_wrapper";

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
      chatID: this.props.chatID,
      label: this.props.inputLabel,
      onClose: this.props.onClose,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { PopupSaveAvatar };
