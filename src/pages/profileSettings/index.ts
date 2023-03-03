import { Avatar } from "../../components";
import { Block } from "../../utils";
import template from "./profileSettings.hbs";
import checkmark from "../../../static/icons/file.svg";
import { Form } from "./components";

class ProfileSettings extends Block {
  constructor() {
    const props = {
      classNames: ["page-wrapper", "profile"],
    };

    super("main", props);
  }

  init() {
    this.children.avatar = new Avatar({
      checkmark,
    });

    this.children.form = new Form();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ProfileSettings };
