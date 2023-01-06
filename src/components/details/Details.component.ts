import Component from '../../core/components/component.core';
import { DomNode } from '../../core/components/node.core';
import { renderProductDetails } from './Details.template';
import { ComponentOptions, ProductI } from '../../constants/types';
import { CurrentRoute } from '../../core/router/currentRoute';
export default class ProductDetails extends Component {
  static tagName = 'div';
  static className = 'product-details d-flex';

  private $btnAddtoCart: DomNode | false;
  private productId: number;
  private cardProduct: ProductI | undefined;

  constructor($root: DomNode, options: ComponentOptions, cardData?: ProductI) {
    super($root, {
      ...options,
      name: 'productDetails',
      listeners: ['click'],
    });
    this.$btnAddtoCart = false;
    this.productId = Number(CurrentRoute.path.split('/').pop());
    this.cardProduct = this.store.state.initialProducts.find((product) => product.id === this.productId);
  }

  init() {
    super.init();
    this.$btnAddtoCart = this.$root.find(`#add-to-cart-btn-${this.productId}`);
  }

  render() {
    return renderProductDetails(this.cardProduct!);
  }

  onClick(e: Event) {
    this.store.getProductsForView()
    if (this.$btnAddtoCart) {
      if (this.cardProduct!.isInCart) {
        this.store.dropFromCart(this.cardProduct!.id);
        this.$btnAddtoCart.html('Add to cart');
      } else {
        this.store.addToCart(this.cardProduct!.id)
        this.$btnAddtoCart.html('<i class="fas fa-check-double"></i> Drop')
      }
    }

    // if(this.$btnAddtoCart ) {
    //   if(this.cardData.isInCart) {
    //     this.store.dropFromCart(this.cardData.id);
    //     this.$productCard.replaceClass('in-cart', 'not-in-cart')
    //     this.$btnAddtoCart.html('Add to cart');
    //   } else {
    //     this.store.addToCart(this.cardData.id)
    //     this.$btnAddtoCart.html('<i class="fas fa-check-double"></i> Drop')
    //     this.$productCard.replaceClass('not-in-cart', 'in-cart')
    //   }
    // }
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
