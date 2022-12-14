import { DomNode } from '../components/node.core';

export class Page {
  constructor(public params: unknown) {
    this.params = params;
  }

  getRoot(): DomNode | void {}

  afterRender(): void {}

  destroy(): void {}
}
