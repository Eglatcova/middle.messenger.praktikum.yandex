import { Block } from "../../utils";
import template from "./errorBanner.hbs";

interface ErrorBannerProps {
  code: string;
  text: string;
  classNames?: string[];
}

class ErrorBanner extends Block {
  constructor(props: ErrorBannerProps) {
    props.classNames = ["error-banner"];
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export { ErrorBanner };
