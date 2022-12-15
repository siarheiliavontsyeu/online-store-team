import { createNode, DomNode } from '../core/components/node.core';
import { Page } from '../core/router/page';

export class Product extends Page {
  render(): DomNode {
    return createNode({ tag: 'div', classes: ['container', 'product-page'] }).html(
      `<h1>Product Page</h1>
      <button type="button" class="btn btn-link"><a href="#222">Not Found</a></button>`
    ) as DomNode;
  }
}
