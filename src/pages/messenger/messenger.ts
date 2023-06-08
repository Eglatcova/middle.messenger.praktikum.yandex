import { Chat, Messages } from "./components";
import { ButtonBase, Link, Popup } from "../../components";
import { Routes } from "../../constants";
import { chatController } from "../../controllers/ChatController";
import { Block, Router } from "../../services";
import { MessengerConnectedProps, MessengerProps } from "./types";
import { isEqual } from "../../helpers";
import template from "./messenger.hbs";

class MessengerView extends Block<MessengerProps> {
  constructor(_: string, connectedProps: MessengerConnectedProps) {
    const props = {
      classNames: ["messenger"],
      name: "Вадим",
      linkProfile: new Link({
        label: "Профайл",
        events: {
          click: () => {
            Router.go(Routes.PROFILE);
          },
        },
      }),
      isPopupOpen: false,
      isLoaded: false,
      ...connectedProps,
    };

    super("main", props);
  }

  async init() {
    this.children.createChatButton = new ButtonBase({
      label: "Создать чат",
      events: {
        click: () => {
          this.setProps({
            isPopupOpen: true,
          });
        },
      },
    });

    this.children.linkProfile = new Link({
      label: "Профайл",
      events: {
        click: () => {
          Router.go(Routes.PROFILE);
        },
      },
    });

    this.children.messages = this.props.currentChat
      ? new Messages("", { messages: [] })
      : null;
  }

  async componentDidMount() {
    await chatController.getChat({});
    this.setProps({ isLoaded: true });
  }

  componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps) {
    const { chats } = this.props;

    this.children.popup = this.props.isPopupOpen
      ? new Popup({
          label: "Создать",
          inputLabel: "Название чата",
          onSubmit: async (login: string) => {
            await chatController.createChat({ title: login });
            chatController.getChat({});
            this.setProps({
              isPopupOpen: false,
            });
          },
          onClose: () => {
            this.setProps({
              isPopupOpen: false,
            });
          },
        })
      : null;

    this.children.chat = chats.map((chatItem) => {
      const { currentChatID } = this.props;

      return new Chat({
        isActive: chatItem.id === currentChatID,
        ...chatItem,
      });
    });

    this.children.messages = this.props.currentChat
      ? new Messages("", { messages: [] })
      : null;

    return !isEqual(oldProps, newProps);
  }

  render() {
    this.dispatchComponentDidMount();
    return this.compile(template, this.props);
  }
}

export { MessengerView };
