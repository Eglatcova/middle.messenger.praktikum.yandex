/* eslint-disable @typescript-eslint/naming-convention */
export enum POPUP_STATE {
  ADD_USER = "ADD_USER",
  DELETE_USER = "DELETE_USER",
  ADD_AVATAR = "ADD_AVATAR",
}

export interface IncomingMenuProps {
  id: number;
}

export interface MenuProps extends IncomingMenuProps {
  popupState: POPUP_STATE | null;
}
