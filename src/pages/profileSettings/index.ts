import { Avatar } from "../../components";
import { Block } from "../../services";
import { BaseBlockProps } from "../../services/types";
import template from "./profileSettings.hbs";
import fileIcon from "../../../static/icons/file.svg";
import { Form } from "./components";

class ProfileSettings extends Block {
  constructor() {
    const props: BaseBlockProps = {
      classNames: ["page-wrapper", "profile"],
    };

    super("main", props);
  }

  init() {
    this.children.avatar = new Avatar({
      icon: fileIcon,
    });

    this.children.form = new Form();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ProfileSettings };
