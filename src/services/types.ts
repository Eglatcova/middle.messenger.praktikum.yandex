export interface BaseBlockProps extends Record<string, any> {
  classNames?: string[];
  attributes?: Record<string, any>;
  events?: Record<string, (event: Event) => void>;
}
