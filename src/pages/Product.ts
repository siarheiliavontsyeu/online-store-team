import { createNode, DomNode } from '../core/components/node.core';
import { Page } from '../core/router/page';
import Store from '../core/store/store.core';

export class Product extends Page {
  constructor(public store: Store, public params?: unknown) {
    super(store, params);
  }
  render(): DomNode {
    return createNode({ tag: 'div', classes: ['container', 'product-page'] }).html(
      `<h1>Product Page</h1>
      <button type="button" class="btn btn-link"><a href="#222">Not Found</a></button>`
    ) as DomNode;
  }
}
