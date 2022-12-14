import { createNode, DomNode } from '../core/components/node.core';
import { Page } from '../core/router/page';

export class NotFound extends Page {
  getRoot(): DomNode {
    return createNode({ tag: 'div', classes: ['notfound-page'] }).html('<h1>NotFound Page</h1>') as DomNode;
  }
}
