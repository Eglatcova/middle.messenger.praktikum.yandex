import { isEqual } from "../../helpers";
import { Block } from "../../services";
import { BaseBlockProps } from "../../services/types";

import template from "./avatar.hbs";
import { Button, Popup } from "./components";

interface IncomingAvatarProps extends BaseBlockProps {
  icon: string;
  avatar: string | null;
  withRedactor?: boolean;
}

interface AvatarProps extends IncomingAvatarProps {
  isPopupOpen: boolean;
}

class Avatar extends Block<AvatarProps> {
  constructor(incomingProps: IncomingAvatarProps) {
    const props = {
      classNames: ["avatar-wrapper"],
      isPopupOpen: false,
      ...incomingProps,
    };

    console.log("incomingProps", incomingProps);

    super("div", props);
  }

  protected init(): void {
    this.children.button = this.props.withRedactor
      ? new Button({
          label: "Поменять аватар",
          events: {
            click: () => {
              this.setProps({
                isPopupOpen: true,
              });
            },
          },
        })
      : null;
  }

  protected componentDidUpdate(
    oldProps: AvatarProps,
    newProps: AvatarProps
  ): boolean {
    this.children.popup = this.props.isPopupOpen
      ? new Popup({
          label: "Создать",
          inputLabel: "Название чата",
          onClose: () => {
            this.setProps({
              isPopupOpen: false,
            });
          },
        })
      : null;

    return !isEqual(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Avatar };
