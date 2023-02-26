import { Block } from "../../utils";
import template from "./link.hbs";

interface LinkProps {
  label: string;
  events: Record<string, () => void>;
  classNames?: string[];
}

class Link extends Block {
  constructor(props: LinkProps) {
    const { classNames } = props;

    if (classNames === undefined) {
      props.classNames = ["link_link"];
    } else {
      classNames.push("link_link");
    }

    super("span", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { Link };
