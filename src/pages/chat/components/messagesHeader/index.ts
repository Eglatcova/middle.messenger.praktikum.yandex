import dotsIcon from "../../../../../static/icons/dots.svg";
import { Block } from "../../../../utils";
import { BaseBlockProps } from "../../../../utils/types";
import template from "./messagesHeader.hbs";

interface MessagesHeaderProps extends BaseBlockProps {
  name: string;
  dotsIcon?: string;
}

class MessagesHeader extends Block<MessagesHeaderProps> {
  constructor(props: MessagesHeaderProps) {
    props.classNames = ["contacts_header"];
    props.dotsIcon = dotsIcon;

    super("main", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { MessagesHeader };
