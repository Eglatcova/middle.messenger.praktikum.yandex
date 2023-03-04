import dotsIcon from "../../../../../static/icons/dots.svg";
import { Block } from "../../../../utils";
import template from "./messagesHeader.hbs";

interface MessagesHeaderProps {
  name: string;
  dotsIcon?: string;
  classNames?: string[];
}

class MessagesHeader extends Block {
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
