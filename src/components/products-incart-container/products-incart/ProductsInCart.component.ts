import { ComponentOptions } from '../../../constants/types';
import Component from '../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../core/components/node.core';
import { getTemplate } from './productsInCart.template';

export default class ProductsInCart extends Component {
  static tagName = 'div';
  static className = 'products-incart';

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'ProductsInCart',
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
    return getTemplate();
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
