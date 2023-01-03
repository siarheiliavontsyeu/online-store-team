import { DomNode } from '../components/node.core';
import Store from '../store/store.core';

export class Page {
  constructor(public store: Store, public params?: string, public query?: string) {}

  render(): DomNode | void {}

  afterRender(): void {}

  destroy(): void {}
}
