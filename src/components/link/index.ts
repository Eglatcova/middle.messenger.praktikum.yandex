import { Block } from "../../services";
import { BaseBlockProps } from "../../services/types";
import { template } from "./link.tmpl";

interface LinkProps extends BaseBlockProps {
  label: string;
}

class Link extends Block<LinkProps> {
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
