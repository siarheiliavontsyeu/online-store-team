import { CartPageContainer } from '../components/cart-page/CartPageContainer';
import { DomNode } from '../core/components/node.core';
import { CurrentRoute } from '../core/router/currentRoute';
import { Page } from '../core/router/page';
import Store from '../core/store/store.core';

export class Cart extends Page {
  private cartPageContainer: CartPageContainer | null;

  constructor(public store: Store) {
    super(store);
    this.cartPageContainer = null;
  }

  render(): DomNode {
    this.cartPageContainer = new CartPageContainer(this.store);
    return this.cartPageContainer.render();
  }

  afterRender() {
    this.cartPageContainer?.init();
  }

  destroy() {
    this.cartPageContainer?.destroy();
  }
}
