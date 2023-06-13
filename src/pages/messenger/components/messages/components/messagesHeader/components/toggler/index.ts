import { Block } from "../../../../../../../../services";
import { BaseBlockProps } from "../../../../../../../../services/types";
import dotsIcon from "../../../../../../../../../static/icons/dots.svg";
import template from "./toggler.hbs";

interface TogglerProps extends BaseBlockProps {
  onClick: () => void;
  dotsIcon?: string;
}

class Toggler extends Block {
  constructor(props: TogglerProps) {
    props.classNames = ["contacts_header-menu-toggler"];
    props.events = {
      click: props.onClick,
    };
    props.dotsIcon = dotsIcon;
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Toggler };
