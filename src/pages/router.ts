import { Cart } from './Cart';
import { Main } from './Main';
import { NotFound } from './NotFound';
import { Product } from './Product';
import { DomNode, wrapperNode } from '../core/components/node.core';
import { CurrentRoute } from '../core/router/currentRoute';
import { Page } from '../core/router/page';
import Store from '../core/store/store.core';

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
    console.log(this.store.state);
  }

  changePageHandler() {
    console.log(CurrentRoute.path);
    if (this.page) {
      this.page.destroy();
    }

    this.$container.clear();

    let AppPage: PagesClasses;
    if (['', 'main'].includes(CurrentRoute.path)) {
      AppPage = this.routes.main;
    } else if (CurrentRoute.path === 'product') {
      AppPage = this.routes.product;
    } else if (CurrentRoute.path === 'cart') {
      AppPage = this.routes.cart;
    } else {
      AppPage = this.routes.notFound;
    }

    console.log(AppPage);

    this.page = new AppPage(this.store, CurrentRoute.param);
    this.$container.append(this.page?.render() as DomNode);
    this.page?.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
