import { DomNode, wrapperNode } from '../components/node.core';
import { CurrentRoute } from './currentRoute';
import { Page } from './page';

export class Router {
  private $placeholder: DomNode;
  page: Page; //TODO type

  constructor(private selector: string, private routes: { [key: string]: Page } /** TODO type */) {
    this.$placeholder = wrapperNode(selector);
    this.routes = routes;
    this.page = this.routes.main;
    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }

    this.$placeholder.clear();

    let AppPage: Page;
    if (CurrentRoute.path.includes('')) {
      AppPage = this.routes.main;
    } else if (CurrentRoute.path.includes('product')) {
      AppPage = this.routes.cart;
    } else if (CurrentRoute.path.includes('cart')) {
      AppPage = this.routes.cart;
    } else {
      AppPage = this.routes.notFound;
    }

    this.page = new (AppPage as unknown as new (...params: unknown[]) => typeof AppPage)(CurrentRoute.param);

    this.$placeholder.append(this.page?.getRoot() as DomNode);

    this.page?.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
