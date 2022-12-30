import { ProductPageContainer } from '../components/product-page/ProductPageContainer';
import { createNode, DomNode } from '../core/components/node.core';
import { Page } from '../core/router/page';
import Store from '../core/store/store.core';

export class Product extends Page {
  private productPageContainer: ProductPageContainer | null;

  constructor(public store: Store) {
    super(store);
    this.productPageContainer = null;
  }


  // render(): DomNode {
  //   return createNode({ tag: 'div', classes: ['container', 'cart-page'] }).html(
  //     `<h1>Product Page</h1>
  //   <button type="button" class="btn btn-link"><a href="#cart">Product</a></button>`
  //   ) as DomNode;
  // }

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
