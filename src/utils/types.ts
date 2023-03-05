export interface BaseBlockProps {
  classNames?: string[];
  attributes?: Record<string, any>;
  events?: Record<string, (event: Event) => void>;
}
