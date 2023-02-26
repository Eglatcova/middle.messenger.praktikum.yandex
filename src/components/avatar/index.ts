import { Block } from "../../utils";
import template from "./avatar.hbs";

interface AvatarProps {
  checkmark: string;
  classNames?: string[];
}

class Avatar extends Block {
  constructor(props: AvatarProps) {
    props.classNames = ["avatar-wrapper"];
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Avatar };
