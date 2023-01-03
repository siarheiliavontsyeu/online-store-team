import { createNode, DomNode } from '../core/components/node.core';
import { Page } from '../core/router/page';
import Store from '../core/store/store.core';

export class Cart extends Page {
  constructor(public store: Store) {
    super(store);
  }

  render(): DomNode {
    return createNode({ tag: 'div', classes: ['container', 'cart-page'] }).html(
      `<h1>Cart Page</h1>
    <button type="button" class="btn btn-link"><a href="#product">Product</a></button>`
    ) as DomNode;
  }
}
