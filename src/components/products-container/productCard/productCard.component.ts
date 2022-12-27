import Component from '../../../core/components/component.core';
import { ComponentOptions, ProductI} from '../../../constants/types';
import { DomNode } from '../../../core/components/node.core';
import { renderProductCard } from './productCard.template';


export default class productCard extends Component {
    static tagName = 'div';
    static className = 'product-item';

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
        return renderProductCard(this.cardData);
      }
    
      destroy() {
        super.destroy();
        this.$root.clear();
      }

}