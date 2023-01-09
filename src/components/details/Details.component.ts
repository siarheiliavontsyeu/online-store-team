import Component from '../../core/components/component.core';
import { DomNode, wrapperNode } from '../../core/components/node.core';
import { renderProductDetails } from './Details.template';
import { ComponentOptions, ProductI } from '../../constants/types';
import { Actions } from '../../constants/actions';
export default class ProductDetails extends Component {
  static tagName = 'div';
  static className = 'product-details';

  private $btnAddToCart: DomNode | false;
  private $btnDropFromCart: DomNode | false;
  private $btnBuy: DomNode | false = false;

  private $mainPhoto: DomNode | false;
  private productId: number;
  private cardProduct: ProductI | undefined | null;

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'productDetails',
      listeners: ['click'],
    });
    this.$btnAddToCart = false;
    this.$btnDropFromCart = false;
    this.$currentPhoto = false;
    this.$mainPhoto = false;
    this.productId = Number(this.store.getUrlParams());
    this.cardProduct = this.store.getProductByIdForView(this.productId);
  }

  init() {
    super.init();
    this.$btnAddToCart = this.$root.find(`#add-to-cart-btn-${this.productId}`);
    this.$btnDropFromCart = this.$root.find(`#drop-from-cart-btn-${this.productId}`);
    this.$mainPhoto = this.$root.find('.main-photo');
    this.$btnBuy = this.$root.find('.btn-buy');
    this.subscribe(Actions.PRODUCT_ADD_TO_CART, () => {
      this.update();
    });
    this.subscribe(Actions.PRODUCT_DROP_FROM_CART, () => {
      this.update();
    });
  }

  render() {
    this.cardProduct = this.store.getProductByIdForView(this.productId);
    return renderProductDetails(this.cardProduct);
  }

  onClick(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);

    if (this.$btnAddToCart && this.cardProduct) {
      const isBtnAddToCart = $target.attr('id') === this.$btnAddToCart.attr('id') || $target.hasClass('fa-cart-plus');

      if (isBtnAddToCart && !this.cardProduct.isInCart) {
        console.log(isBtnAddToCart);
        this.store.addToCart(this.cardProduct.id);
        this.emit(Actions.PRODUCT_ADD_TO_CART);
      }
    }
    if (this.$btnDropFromCart && this.cardProduct) {
      const isBtnDropFromCart =
        $target.attr('id') === this.$btnDropFromCart.attr('id') || $target.hasClass('fa-trash-alt');
      if (isBtnDropFromCart && this.cardProduct.isInCart) {
        console.log(123);
        this.store.dropFromCart(this.cardProduct.id);
        this.emit(Actions.PRODUCT_DROP_FROM_CART);
      }
    }
    const $currentPhoto = Number($target.attr('id'))
    if ($currentPhoto) {
      if (this.$mainPhoto) {
        this.$mainPhoto.inlineCss({ ['background']: `url(${this.cardProduct?.images[$currentPhoto - 1]}) 0px 0px / 90% no-repeat` })
      }
    }

    if (this.$btnBuy) {
      const isBtnBuy = $target.attr('id') === this.$btnBuy.attr('id');
      if(isBtnBuy){
        console.log('Hello')
      }
    }

  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
