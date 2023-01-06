import Component from '../../../../../core/components/component.core';
import { ComponentOptions, ProductI } from '../../../../../constants/types';
import { DomNode, wrapperNode } from '../../../../../core/components/node.core';
import { renderProductCard } from './productCard.template';

export default class productCard extends Component {
  static tagName = 'div';
  static className = 'product-item';

  private cardData: ProductI;
  private $btnAddtoCart: DomNode | false;
  private $productCard: DomNode | false;

  constructor($root: DomNode, options: ComponentOptions, cardData: ProductI) {
    super($root, {
      ...options,
      name: 'productCard',
      listeners: ['click'],
    });
    this.cardData = cardData;
    this.$btnAddtoCart = false;
    this.$productCard = false;
  }

  init() {
    super.init();
    this.$productCard = this.$root.find(`#product-card-${this.cardData.id}`);
    this.$btnAddtoCart = this.$root.find(`#add-to-cart-btn-${this.cardData.id}`);
  }

  render() {
    return renderProductCard(this.cardData);
  }

  onClick(e: Event) {
    this.store.getProductsForView()
    if(this.$btnAddtoCart && this.$productCard) {
      if(this.cardData.isInCart) {
        this.store.dropFromCart(this.cardData.id);
        this.$productCard.replaceClass('in-cart', 'not-in-cart')
        this.$btnAddtoCart.html('Add to cart');
      } else {
        this.store.addToCart(this.cardData.id)
        this.$btnAddtoCart.html('<i class="fas fa-check-double"></i> Drop')
        this.$productCard.replaceClass('not-in-cart', 'in-cart')
      }
    }

    console.log(this.cardData.isInCart, this.store.state.cart)
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
