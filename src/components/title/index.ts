import { Block } from "../../utils";
import template from "./title.hbs";

interface TitleProps {
  label: string;
  classNames?: string[];
}

class Title extends Block {
  constructor(props: TitleProps) {
    const { classNames } = props;

    if (classNames === undefined) {
      props.classNames = ["title"];
    } else {
      classNames.push("title");
    }

    super("h2", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export { Title };
