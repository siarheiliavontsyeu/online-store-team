import { ComponentOptions } from '../../../constants/types';
import Component from '../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../core/components/node.core';
import { getTemplate } from './product.template';

export default class Product extends Component {
  static tagName = 'div';
  static className = 'cart-product';

  constructor($root: DomNode, options: ComponentOptions) {
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
    return getTemplate();
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
