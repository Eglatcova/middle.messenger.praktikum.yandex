import { Block } from "../../utils";
import { BaseBlockProps } from "../../utils/types";
import template from "./avatar.hbs";

interface AvatarProps extends BaseBlockProps {
  icon: string;
}

class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    props.classNames = ["avatar-wrapper"];
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Avatar };
