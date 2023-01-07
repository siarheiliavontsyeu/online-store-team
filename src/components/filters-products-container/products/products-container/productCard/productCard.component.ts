import Component from '../../../../../core/components/component.core';
import { ComponentOptions, ProductI } from '../../../../../constants/types';
import { DomNode, wrapperNode } from '../../../../../core/components/node.core';
import { renderProductCard } from './productCard.template';
import { Actions } from '../../../../../constants/actions';

export default class productCard extends Component {
  static tagName = 'div';
  static className = 'product-item';

  private cardData: ProductI;
  private $btnAddToCart: DomNode | false;
  private $btnDropFromCart: DomNode | false;

  constructor($root: DomNode, options: ComponentOptions, cardData: ProductI) {
    super($root, {
      ...options,
      name: 'productCard',
      listeners: ['click'],
    });
    this.cardData = cardData;
    this.$btnAddToCart = false;
    this.$btnDropFromCart = false;
  }

  init() {
    super.init();
    this.$btnAddToCart = this.$root.find(`#add-to-cart-btn-${this.cardData.id}`);
    this.$btnDropFromCart = this.$root.find(`#drop-from-cart-btn-${this.cardData.id}`);
  }

  render() {
    return renderProductCard(this.cardData);
  }

  onClick(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    if (this.$btnAddToCart) {
      const isBtnAddToCart = $target.attr('id') === this.$btnAddToCart.attr('id') || $target.hasClass('fas');
      if (isBtnAddToCart && !this.cardData.isInCart) {
        this.store.addToCart(this.cardData.id);
        this.emit(Actions.PRODUCT_ADD_TO_CART);
      }
    }
    if (this.$btnDropFromCart) {
      const isBtnDropFromCart = $target.attr('id') === this.$btnDropFromCart.attr('id') || $target.hasClass('fas');
      if (isBtnDropFromCart && this.cardData.isInCart) {
        this.store.dropFromCart(this.cardData.id);
        this.emit(Actions.PRODUCT_DROP_FROM_CART);
      }
    }
  }
  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
