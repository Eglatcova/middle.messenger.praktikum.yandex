import { Block } from "../../services";
import { BaseBlockProps } from "../../services/types";
import { template } from "./title.tmpl";

interface TitleProps extends BaseBlockProps {
  label: string;
}

class Title extends Block<TitleProps> {
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
