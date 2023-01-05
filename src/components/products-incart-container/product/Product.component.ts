import { CartI, ComponentOptions, ProductI } from '../../../constants/types';
import Component from '../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../core/components/node.core';
import { getTemplate } from './product.template';

export default class Product extends Component {
  static tagName = 'div';
  static className = 'cart-product mb-2';

  constructor($root: DomNode, options: ComponentOptions, private product: CartI, private idx: number) {
    super($root, {
      ...options,
      name: 'Product',
      listeners: ['click'],
    });
  }

  init() {
    super.init();
  }

  onClick(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
  }

  render() {
    const product: ProductI = this.store.getProductById(this.product.id)!;
    const count = this.product.count;
    const sum = product.price * count;
    return getTemplate(this.idx, product, count, sum);
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
