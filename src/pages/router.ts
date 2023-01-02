import { Cart } from './Cart';
import { Main } from './Main';
import { NotFound } from './NotFound';
import { Product } from './Product';
import { DomNode, wrapperNode } from '../core/components/node.core';
import { CurrentRoute } from '../core/router/currentRoute';
import { Page } from '../core/router/page';
import Store from '../core/store/store.core';

enum PageNames {
  product = 'product',
  main = 'main',
  cart = 'cart',
  notFound = '404',
}

interface Pages {
  main: typeof Main;
  product: typeof Product;
  cart: typeof Cart;
  notFound: typeof NotFound;
}

type PagesClasses = typeof Main | typeof Product | typeof Cart | typeof NotFound;

export class Router {
  private $container: DomNode;
  private page: Page | null;
  private routes: Pages;

  constructor(protected selector: string, protected store: Store) {
    this.$container = wrapperNode(selector);
    this.routes = {
      main: Main,
      product: Product,
      cart: Cart,
      notFound: NotFound,
    };
    this.page = null;
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

    this.$container.clear();

    let AppPage: PagesClasses;
    if (['', PageNames.main].includes(CurrentRoute.pageName)) {
      AppPage = this.routes.main;
    } else if (CurrentRoute.pageName === PageNames.product) {
      AppPage = this.routes.product;
    } else if (CurrentRoute.pageName === PageNames.cart) {
      AppPage = this.routes.cart;
    } else if (CurrentRoute.pageName === PageNames.notFound) {
      AppPage = this.routes.notFound;
    } else {
      AppPage = this.routes.notFound;
    }

    this.page = new AppPage(this.store, CurrentRoute.param);
    this.$container.append(this.page?.render() as DomNode);
    this.page?.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
