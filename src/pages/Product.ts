import { createNode, DomNode } from '../core/components/node.core';
import { Page } from '../core/router/page';

export class Product extends Page {
  getRoot(): DomNode {
    return createNode({ tag: 'div', classes: ['product-page'] }).html('<h1>Product Page</h1>') as DomNode;
  }
}
