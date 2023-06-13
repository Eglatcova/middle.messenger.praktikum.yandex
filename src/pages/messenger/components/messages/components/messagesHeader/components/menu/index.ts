/* eslint-disable operator-linebreak */
import { Block } from "../../../../../../../../services";
import { Popup, PopupSave } from "../../../../../../../../components";
import { isEqual } from "../../../../../../../../helpers";
import { chatController } from "../../../../../../../../controllers/ChatController";
import { IncomingMenuProps, MenuProps, POPUP_STATE } from "./types";
import {
  getCurrentChat,
  getUserData,
  setCurrentChat,
} from "../../../../../../../../services/Store/Actions";
import { PopupProps } from "../../../../../../../../components/popup/types";
import { Button } from "./components";
import plus from "./icons/plus.svg";
import close from "./icons/close.svg";
import template from "./menu.hbs";

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

    this.children.buttonAddAvatar = new Button({
      icon: close,
      label: "Добавить аватар чата",
      onClick: () => {
        this.setProps({
          popupState: POPUP_STATE.ADD_AVATAR,
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

    const popupStates: Record<string, PopupProps> = {
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

    this.children.popup =
      popupState && popupState !== POPUP_STATE.ADD_AVATAR
        ? new Popup(popupStates[popupState])
        : null;

    this.children.popupAddAvatar =
      popupState === POPUP_STATE.ADD_AVATAR
        ? new PopupSave({
            inputLabel: "Логин",
            chatID: this.props.id,
            onClose,
          })
        : null;

    return !isEqual(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Menu };
