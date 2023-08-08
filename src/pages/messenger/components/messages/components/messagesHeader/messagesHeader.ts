import dotsIcon from "../../../../../../../static/icons/dots.svg";
import { isEqual } from "../../../../../../helpers";
import { Block } from "../../../../../../services";
import { Toggler, Menu } from "./components";
import { MessagesHeaderConnectedProps, MessagesHeaderProps } from "./types";
import { template } from "./messagesHeader.tmpl";

class MessagesHeaderView extends Block<MessagesHeaderProps> {
  constructor(_: string, connectedProps: MessagesHeaderConnectedProps) {
    const props = {
      classNames: ["messages-header"],
      dotsIcon,
      isModalOpen: false,
      ...connectedProps,
    };

    super("div", props);
  }

  init() {
    this.children.toggler = new Toggler({
      onClick: () => {
        this.setProps({
          ...this.props,
          isModalOpen: !this.props.isModalOpen,
        });
      },
    });
  }

  componentDidUpdate(
    oldProps: MessagesHeaderProps,
    newProps: MessagesHeaderProps
  ): boolean {
    if (newProps.isModalOpen) {
      this.children.popup = new Menu({
        id: this.props.id,
      });
    } else {
      this.children.popup = null;
    }

    return !isEqual(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { MessagesHeaderView };
