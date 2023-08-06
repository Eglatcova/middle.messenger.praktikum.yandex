/* eslint-disable no-constructor-return */
/* eslint-disable max-classes-per-file */
import { Block } from "./Block";
import { BaseBlockProps } from "./types";

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block<BaseBlockProps>) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = "";

  root.append(block.getContent());

  return root;
}

class Route {
  private block: Block | null = null;

  constructor(
    public pathname: string,
    private readonly BlockClass: typeof Block<BaseBlockProps>,
    private readonly query: string
  ) {}

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    this.block?.onLeave();
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (this.block === null) {
      this.block = new this.BlockClass();
      render(this.query, this.block);
      return;
    }

    this.block.show();
  }
}

class Router {
  private static instance: Router;
  private routes: Route[] = [];

  private rootQuery: string;

  public currentRoute: Route | null = null;
  public history = window.history;

  public constructor(rootQuery: string) {
    if (Router.instance) {
      return Router.instance;
    }

    Router.instance = this;

    this.rootQuery = rootQuery;
  }

  public use(pathname: string, block: typeof Block<BaseBlockProps>) {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);
    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this.onRoute(target.location.pathname);
    };

    this.onRoute(window.location.pathname);
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, "", pathname);

    this.onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

const RouterSingletone = new Router("#app");

export { RouterSingletone as Router, Route };
