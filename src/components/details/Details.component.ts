import Component from '../../core/components/component.core';
import { DomNode } from '../../core/components/node.core';
import { renderProductDetails } from './Details.template';
import { ComponentOptions, ProductI } from '../../constants/types';

export default class ProductDetails extends Component {
    static tagName = 'div';
    static className = 'product-details d-flex';

    private cardData: ProductI;

    constructor($root: DomNode, options: ComponentOptions, cardData: ProductI) {
      super($root, {
        ...options,
        name: 'productCard',
        listeners: [],
      });
      this.cardData = cardData;
    }
  
    init() {
      super.init();
    }
  
    render() {
      return renderProductDetails(this.cardData);
    }
  
    destroy() {
      super.destroy();
      this.$root.clear();
    }
  }
