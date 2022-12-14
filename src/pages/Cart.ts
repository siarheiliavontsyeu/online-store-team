import { createNode, DomNode } from '../core/components/node.core';
import { Page } from '../core/router/page';

export class Cart extends Page {
  getRoot(): DomNode {
    return createNode({ tag: 'div', classes: ['cart-page'] }).html('<h1>Cart Page</h1>') as DomNode;
  }
}
