/* eslint-disable operator-linebreak */
import { Block } from "../../../../../../../../services";
import { Popup } from "../../../../../../../../components";
import { isEqual } from "../../../../../../../../helpers";
import { chatController } from "../../../../../../../../controllers/ChatController";
import { IncomingMenuProps, MenuProps, POPUP_STATE } from "./types";
import {
  getCurrentChat,
  getUserData,
  setCurrentChat,
} from "../../../../../../../../services/Store/Actions";
import { PopupProps } from "../../../../../../../../components/popup/types";
import { Button, PopupSaveAvatar } from "./components";
import { template } from "./menu.tmpl";

const plusSVG = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="10.25" stroke="#3369F3" stroke-width="1.5" />
<line x1="10.9999" y1="5.5" x2="10.9999" y2="16.5" stroke="#3369F3" stroke-width="1.5" />
<line x1="5.49988" y1="11" x2="16.4999" y2="11" stroke="#3369F3" stroke-width="1.5" />
</svg>
`;

const closeSVG = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="10.25" stroke="#3369F3" stroke-width="1.5" />
<line x1="7.11077" y1="7.11103" x2="14.8889" y2="14.8892" stroke="#3369F3" stroke-width="1.5" />
<line x1="7.11078" y1="14.8891" x2="14.889" y2="7.11093" stroke="#3369F3" stroke-width="1.5" />
</svg>`;

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
      icon: plusSVG,
      label: "Добавить пользователя",
      onClick: () => {
        this.setProps({
          popupState: POPUP_STATE.ADD_USER,
        });
      },
    });

    this.children.buttonDeleteUser = new Button({
      icon: closeSVG,
      label: "Удалить пользователя",
      onClick: () => {
        this.setProps({
          popupState: POPUP_STATE.DELETE_USER,
        });
      },
    });

    this.children.buttonAddAvatar = new Button({
      icon: plusSVG,
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
          icon: closeSVG,
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
        ? new PopupSaveAvatar({
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
