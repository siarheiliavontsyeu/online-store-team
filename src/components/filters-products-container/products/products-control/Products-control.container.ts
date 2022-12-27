import { ComponentOptions } from '../../../../constants/types';
import Component from '../../../../core/components/component.core';
import { DomNode } from '../../../../core/components/node.core';
import { getTemplate } from './products-control.template';

export default class ProductsControl extends Component {
  static tagName = 'div';
  static className = 'products-control';

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'ProductsControl',
      listeners: [],
    });
  }

  init() {
    super.init();
  }

  render() {
    return getTemplate({ productsFoundCount: this.store.getProductsFoundCount() });
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
