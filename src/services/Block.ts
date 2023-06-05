import { nanoid } from "nanoid";
import { EventBus } from "./EventBus";
import { BaseBlockProps } from "./types";

class Block<Props extends BaseBlockProps = {}> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private eventBus: () => EventBus;
  private _element: HTMLElement;
  private _meta: { tagName: string; props: Props };

  protected props: Props;

  public id = nanoid(6);
  public children: Record<string, Block | Block[] | null>;

  constructor(tagName = "div", propsWithChildren: Props = {} as Props) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.eventBus = () => eventBus;
    this._meta = { tagName, props };
    this.children = children;
    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(propsWithChildren: Props) {
    const props: Props = {} as Props;
    const children: Record<string, Block> = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        const currKey = key as keyof Props;
        props[currKey] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.entries(events).forEach(([name, cb]) => {
      this._element.addEventListener(name, cb);
    });
  }

  _addAttributes() {
    const { attributes = {} } = this.props;

    Object.entries(attributes as Record<string, any>).forEach(
      ([name, value]) => {
        this._element.setAttribute(name, value);
      }
    );
  }

  _addClassNames() {
    const { classNames = [] } = this.props;

    (classNames as string[]).forEach((className) => {
      this._element.classList.add(className);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.entries(events).forEach(([name, cb]) => {
      this._element.removeEventListener(name, cb);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      if (child === null) return;
      if (Array.isArray(child)) {
        child.forEach((item) => {
          item.dispatchComponentDidMount();
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  setProps = (nextProps: Partial<Props>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public onLeave() {}

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();
    this._element.innerHTML = "";

    this._element.append(fragment);

    this._addEvents();
    this._addClassNames();
    this._addAttributes();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected compile(template: (context: any) => string, context: Props) {
    const contextAndStubs: Record<string, any> = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (component === null) return;
      if (!Array.isArray(component)) {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);
    const temp = document.createElement("template");
    temp.innerHTML = html;

    Object.entries(this.children).forEach(([name, component]) => {
      if (component === null) return;
      if (Array.isArray(component)) {
        component.forEach((item, index) => {
          const stub = temp.content.querySelector(
            `[data-id="${name}_${index}"]`
          );
          if (!stub) return;
          item.getContent().append(...Array.from(stub.childNodes));
          stub.replaceWith(item.getContent());
        });
      } else {
        const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
        if (!stub) return;
        component.getContent().append(...Array.from(stub.childNodes));
        stub.replaceWith(component.getContent());
      }
    });

    return temp.content;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy(props, {
      get(target: Props, prop: keyof Props & string) {
        const value: any = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Props, prop: keyof Props & string, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}

export { Block };
