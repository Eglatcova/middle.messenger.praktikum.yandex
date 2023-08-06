import { Block } from "../Block";
import { BaseBlockProps } from "../types";
import { Store } from "./Store";
import { State, StoreEvents } from "./types";

type MapStateToProps = (state: State) => Record<string, any>;

const Connect =
  <P extends BaseBlockProps>(mapStateToProps: MapStateToProps) =>
  (Component: typeof Block<P>) => {
    let propsFromState: Record<string, any>;

    return class WithStore extends Component {
      constructor(tagName: string, props: P) {
        propsFromState = mapStateToProps(Store.getState());

        super(tagName, { ...props, ...propsFromState });

        Store.on(StoreEvents.Updated, () => {
          const newPropsFromState = mapStateToProps(Store.getState());

          propsFromState = { ...newPropsFromState };

          this.setProps({ ...propsFromState } as P);
        });
      }
    };
  };

export { Connect };
