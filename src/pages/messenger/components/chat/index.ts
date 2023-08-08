import { isEqual } from "../../../../helpers";
import { Block } from "../../../../services";
import { setCurrentChat } from "../../../../services/Store/Actions";
import { ChatItem } from "../../../../services/Store/types";
import { BaseBlockProps } from "../../../../services/types";
import { template } from "./chat.tmpl";

interface ContactProps extends BaseBlockProps, ChatItem {
  isActive: boolean;
  isPopupOpen: boolean;
}

class Chat extends Block<ContactProps> {
  constructor(props: ContactProps) {
    props.classNames = ["chat_item"];
    props.isPopupOpen = false;
    if (props.isActive) {
      props.classNames.push("chat_item__active");
    }

    props.events = {
      click: () => {
        setCurrentChat(props);
      },
    };

    super("div", props);
  }

  init() {
    const avatarSrc = this.props.avatar
      ? `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}`
      : "";
    this.children.avatar = new Block<BaseBlockProps>("img", {
      classNames: ["chat_img"],
      attributes: {
        src: avatarSrc,
        alt: "img",
      },
      events: {
        click: () => {
          this.setProps({ isPopupOpen: true });
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: ContactProps,
    newProps: ContactProps
  ): boolean {
    const avatarSrc = this.props.avatar
      ? `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}`
      : "";

    this.children.avatar = new Block<BaseBlockProps>("img", {
      classNames: ["chat_img"],
      attributes: {
        src: avatarSrc,
        alt: "img",
      },
    });

    return !isEqual(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Chat };
