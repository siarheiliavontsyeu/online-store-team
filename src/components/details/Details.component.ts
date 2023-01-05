import Component from '../../core/components/component.core';
import { DomNode } from '../../core/components/node.core';
import { renderProductDetails } from './Details.template';
import { ComponentOptions, ProductI } from '../../constants/types';
import { CurrentRoute } from '../../core/router/currentRoute';
export default class ProductDetails extends Component {
    static tagName = 'div';
    static className = 'product-details d-flex';

    constructor($root: DomNode, options: ComponentOptions, cardData?: ProductI) {
      super($root, {
        ...options,
        name: 'productDetails',
        listeners: [],
      });
    }
  
    init() {
      super.init();
    }
  
    render() {
      const productId = Number(CurrentRoute.path.split('/').pop());
      const cardProduct = this.store.state.initialProducts.find((product)=> product.id === productId)
      return renderProductDetails(cardProduct!);
    }
  
    destroy() {
      super.destroy();
      this.$root.clear();
    }
  }
