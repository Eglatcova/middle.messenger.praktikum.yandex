/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/naming-convention */
import { Avatar } from "../../components";
import { Block, Connect } from "../../services";
import template from "./profileSettings.hbs";
import fileIcon from "../../../static/icons/file.svg";
import { Form } from "./components";
import { ProfileSettingsConnectedProps } from "./types";
import { State } from "../../services/Store/types";
import { isEqual } from "../../helpers";

class ProfileSettingsPage extends Block<ProfileSettingsConnectedProps> {
  constructor(_: string, connectedProps: ProfileSettingsConnectedProps) {
    const props = {
      classNames: ["page-wrapper", "profile"],
      ...connectedProps,
    };

    super("main", props);
  }

  init() {
    const {
      avatar,
      id,
      first_name,
      second_name,
      phone,
      email,
      login,
      display_name,
    } = this.props;

    this.children.avatar = new Avatar({
      avatar,
      icon: fileIcon,
      withRedactor: true,
    });

    this.children.form = new Form({
      id,
      first_name,
      second_name,
      phone,
      email,
      login,
      display_name,
    });
  }

  componentDidUpdate(
    oldProps: ProfileSettingsConnectedProps,
    newProps: ProfileSettingsConnectedProps
  ): boolean {
    if (oldProps.avatar !== newProps.avatar) {
      this.children.avatar = new Avatar({
        avatar: newProps.avatar,
        icon: fileIcon,
        withRedactor: true,
      });
    }

    return !isEqual(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const getUserAvatar = (state: State) => state.user.data;

const ProfileSettings =
  Connect<ProfileSettingsConnectedProps>(getUserAvatar)(ProfileSettingsPage);

export { ProfileSettings };
