import Component from '../../core/components/component.core';
import { DomNode, wrapperNode } from '../../core/components/node.core';
import { renderProductDetails } from './Details.template';
import { ComponentOptions, ProductI } from '../../constants/types';
import { CurrentRoute } from '../../core/router/currentRoute';
export default class ProductDetails extends Component {
  static tagName = 'div';
  static className = 'product-details d-flex';

  private $btnAddtoCart: DomNode | false;
  private $currentPhoto: DomNode | false;
  private $mainPhoto: DomNode | false;

  private productId: number;
  private photoId: number | undefined;
  private cardProduct: ProductI | undefined;

  constructor($root: DomNode, options: ComponentOptions, cardData?: ProductI) {
    super($root, {
      ...options,
      name: 'productDetails',
      listeners: ['click'],
    });
    this.$btnAddtoCart = false;
    this.$currentPhoto = false;
    this.$mainPhoto = false;
    this.productId = Number(CurrentRoute.path.split('/').pop());
    this.cardProduct = this.store.state.initialProducts.find((product) => product.id === this.productId);

  }

  init() {
    super.init();
    this.$btnAddtoCart = this.$root.find(`#add-to-cart-btn-${this.productId}`);
    this.$currentPhoto = this.$root.find(`photo-item-${this.photoId}`);
    this.$mainPhoto = this.$root.find(`main-photo`);
  }

  render() {
    return renderProductDetails(this.cardProduct!);
  }

  onClick(e: Event) {
    this.store.getProductsForView()
    const $target = wrapperNode(e.target as HTMLElement);
    if (this.$btnAddtoCart) {
      const isBtnAddtoCart = $target.attr('id') === this.$btnAddtoCart.attr('id');
      if (isBtnAddtoCart) {
        if (this.cardProduct!.isInCart) {
          this.store.dropFromCart(this.cardProduct!.id);
          this.$btnAddtoCart.html('Add to cart');
        } else {
          this.store.addToCart(this.cardProduct!.id)
          this.$btnAddtoCart.html('<i class="fas fa-check-double"></i> Drop')
        }
      }
    }
    if (this.$currentPhoto) {
      console.log(this.$currentPhoto)
      const iscurrentPhoto = $target.attr('id') === this.$currentPhoto.attr('id');
      if(iscurrentPhoto) {
        console.log("Hello!")
      }
    }
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
