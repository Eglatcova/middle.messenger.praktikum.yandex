import { Block } from "../../services";
import { BaseBlockProps } from "../../services/types";
import template from "./errorBanner.hbs";

interface ErrorBannerProps extends BaseBlockProps {
  code: string;
  text: string;
}

class ErrorBanner extends Block<ErrorBannerProps> {
  constructor(props: ErrorBannerProps) {
    props.classNames = ["error-banner"];
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export { ErrorBanner };
