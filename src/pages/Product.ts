import { ProductPageContainer } from '../components/product-page/ProductPageContainer';
import { createNode, DomNode } from '../core/components/node.core';
import { CurrentRoute } from '../core/router/currentRoute';
import { Page } from '../core/router/page';
import Store from '../core/store/store.core';

export class Product extends Page {
  private productPageContainer: ProductPageContainer | null;

  constructor(public store: Store) {
    super(store);
    this.productPageContainer = null;
  }

  render(): DomNode {
    this.productPageContainer = new ProductPageContainer(this.store);
    return this.productPageContainer.render();
  }

  afterRender() {
    this.productPageContainer?.init();
  }

  destroy() {
    this.productPageContainer?.destroy();
  }
}
