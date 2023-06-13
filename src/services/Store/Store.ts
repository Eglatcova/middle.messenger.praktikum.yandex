import { set } from "../../helpers";
import { EventBus } from "../EventBus";
import { State, StoreEvents } from "./types";

class Store extends EventBus {
  private state: State = {
    user: {
      data: {
        id: 0,
        first_name: "",
        second_name: "",
        display_name: "",
        login: "",
        email: "",
        phone: "",
        avatar: "",
      },
      requestStatus: "still",
    },
    chat: {
      chats: [],
      currentChat: null,
      currentChatID: 0,
      messages: {},
      sokets: {},
      requestStatus: "still",
    },
  };

  set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated, [this.state]);
  }

  getState(): State {
    return this.state;
  }
}

const SingleStore = new Store();

export { SingleStore as Store };
