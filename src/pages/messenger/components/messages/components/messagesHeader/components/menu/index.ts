import { Block } from "../../../../../../../../services";
import { Popup } from "../../../../../../../../components";
import { isEqual } from "../../../../../../../../helpers";
import { chatController } from "../../../../../../../../controllers/ChatController";
import { Button } from "./components";
import plus from "./icons/plus.svg";
import close from "./icons/close.svg";
import template from "./menu.hbs";
import { IncomingMenuProps, MenuProps, POPUP_STATE } from "./types";
import {
  getCurrentChat,
  getUserData,
  setCurrentChat,
} from "../../../../../../../../services/Store/Actions";

class Menu extends Block<MenuProps> {
  constructor(incomingProps: IncomingMenuProps) {
    const props = {
      classNames: ["header_popup"],
      popupState: null,
      ...incomingProps,
    };

    super("div", props);
  }

  protected init(): void {
    this.children.buttonAddUser = new Button({
      icon: plus,
      label: "Добавить пользователя",
      onClick: () => {
        this.setProps({
          popupState: POPUP_STATE.ADD_USER,
        });
      },
    });

    this.children.buttonDeleteUser = new Button({
      icon: close,
      label: "Удалить пользователя",
      onClick: () => {
        this.setProps({
          popupState: POPUP_STATE.DELETE_USER,
        });
      },
    });

    const currentChat = getCurrentChat();
    const userData = getUserData();
    const currentChatID = currentChat === null ? null : currentChat.created_by;
    const isOwnerOfChat = currentChatID === userData.id;

    this.children.buttonDeleteChat = isOwnerOfChat
      ? new Button({
          icon: close,
          label: "Удалить чат",
          onClick: async () => {
            if (currentChat !== null) {
              await chatController.deleteChat({ chatId: currentChat.id });
              setCurrentChat(null);
              chatController.getChat({});
            }
          },
        })
      : null;
  }

  componentDidUpdate(oldProps: MenuProps, newProps: MenuProps): boolean {
    const onClose = () => {
      this.setProps({
        popupState: null,
      });
    };

    const popupStates = {
      [POPUP_STATE.ADD_USER]: {
        label: "Добавить пользователя",
        inputLabel: "Логин",
        onSubmit: async (login: string) => {
          await chatController.addUser(login);
          chatController.getChat({});
        },
        onClose,
      },
      [POPUP_STATE.DELETE_USER]: {
        label: "Удалить пользователя",
        inputLabel: "Логин",
        onSubmit: async (login: string) => {
          await chatController.deleteUser(login);
          chatController.getChat({});
        },
        onClose,
      },
    };

    const { popupState } = this.props;

    this.children.popup = popupState
      ? new Popup(popupStates[popupState])
      : null;

    return !isEqual(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Menu };
