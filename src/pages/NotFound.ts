import { createNode, DomNode } from '../core/components/node.core';
import { Page } from '../core/router/page';
import Store from '../core/store/store.core';

export class NotFound extends Page {
  constructor(public store: Store, public params?: unknown) {
    super(store, params);
  }
  render(): DomNode {
    return createNode({ tag: 'div', classes: ['container', 'notfound-page'] }).html(
      `<h1>NotFound Page</h1> 
      <button type="button" class="btn btn-link"><a href="#main">Main</a></button>`
    ) as DomNode;
  }
}
