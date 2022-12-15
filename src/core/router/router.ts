import { DomNode, wrapperNode } from '../components/node.core';
import { CurrentRoute } from './currentRoute';
import { Page } from './page';

interface Pages {
  main: unknown;
  product: unknown;
  cart: unknown;
  notFound: unknown;
}

export class Router {
  private $container: DomNode;
  page: Page | null; //TODO type

  constructor(protected selector: string, private routes: Pages) {
    this.$container = wrapperNode(selector);
    this.routes = routes;
    this.page = null;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    console.log(CurrentRoute.path);
    if (this.page) {
      this.page.destroy();
    }

    this.$container.clear();

    let AppPage: Page;
    if (['', 'main'].includes(CurrentRoute.path)) {
      AppPage = this.routes.main as Page;
    } else if (CurrentRoute.path === 'product') {
      AppPage = this.routes.product as Page;
    } else if (CurrentRoute.path === 'cart') {
      AppPage = this.routes.cart as Page;
    } else {
      AppPage = this.routes.notFound as Page;
    }

    console.log(AppPage);

    this.page = new (AppPage as unknown as new (...params: unknown[]) => typeof AppPage)(CurrentRoute.param);
    this.$container.append(this.page?.getRoot() as DomNode);
    this.page?.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
