import { createNode, DomNode } from '../core/components/node.core';
import { Page } from '../core/router/page';

export class MainPage extends Page {
  getRoot(): DomNode {
    return createNode({ tag: 'div', classes: ['container', 'main-page'] }).html(
      `<h1>Main Page</h1>
       <button type="button" class="btn btn-link"><a href="#cart">Cart</a></button>`
    ) as DomNode;
  }
}
