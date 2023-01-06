import Component from '../../../../../core/components/component.core';
import { ComponentOptions, ProductI } from '../../../../../constants/types';
import { DomNode, wrapperNode } from '../../../../../core/components/node.core';
import { renderProductCard } from './productCard.template';

export default class productCard extends Component {
  static tagName = 'div';
  static className = 'product-item';

  private cardData: ProductI;
  private $btnAddtoCart: DomNode | false;

  constructor($root: DomNode, options: ComponentOptions, cardData: ProductI) {
    super($root, {
      ...options,
      name: 'productCard',
      listeners: [],
    });
    this.cardData = cardData;
    this.$btnAddtoCart = false;
  }

  init() {
    super.init();
    this.$btnAddtoCart = this.$root.find('#add-to-cart-btn');
  }

  render() {
    return renderProductCard(this.cardData);
  }

  onClick(e: Event) {
    console.log("Hi!")
    const $target = wrapperNode(e.target as HTMLElement);
    if (this.$btnAddtoCart){
      console.log("Hi!")
      const isBtnAddtoCart = $target.attr('id') === this.$btnAddtoCart.attr('id');
      if(isBtnAddtoCart) {
        console.log("Hi!")
      }
    }
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
