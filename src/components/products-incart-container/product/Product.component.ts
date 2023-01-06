import { Actions } from '../../../constants/actions';
import { CartI, ComponentOptions, ProductI } from '../../../constants/types';
import Component from '../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../core/components/node.core';
import { getTemplate } from './product.template';

export default class Product extends Component {
  static tagName = 'div';
  static className = 'cart-product mb-2';
  private $btnCountDec: DomNode | false;
  private $btnCountInc: DomNode | false;
  private $countValue: DomNode | false;
  private product: ProductI | null;

  constructor($root: DomNode, options: ComponentOptions, private productInCart: CartI, private idx: number) {
    super($root, {
      ...options,
      name: 'Product',
      listeners: ['click'],
    });
    this.$btnCountDec = false;
    this.$btnCountInc = false;
    this.$countValue = false;
    this.product = null;
  }

  init() {
    super.init();
    this.$btnCountDec = this.$root.find('#count-dec');
    this.$btnCountInc = this.$root.find('#count-inc');
    this.$countValue = this.$root.find('#count-value');
  }

  onClick(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    if (this.$btnCountDec && this.$btnCountInc && this.$countValue) {
      const isBtnCountDec = $target.attr('id') === this.$btnCountDec.attr('id') || $target.hasClass('fa-minus-circle');
      const isBtnCountInc = $target.attr('id') === this.$btnCountInc.attr('id') || $target.hasClass('fa-plus-circle');
      const countValue = this.$countValue.text() as string;

      if (isBtnCountDec && this.product) {
        if (Number(countValue) > 0) {
          this.store.dropFromCart(this.product.id);
          this.emit(Actions.PRODUCT_DROP_FROM_CART);
        }
      }

      if (isBtnCountInc && this.product) {
        if (this.productInCart.stock > 0) {
          this.store.addToCart(this.product.id);
          this.emit(Actions.PRODUCT_ADD_TO_CART);
        }
      }
    }
  }

  render() {
    this.product = this.store.getProductById(this.productInCart.id)!;
    const count = this.productInCart.count;
    const stock = this.productInCart.stock;
    const product = this.product;
    const sum = product.price * count;
    return getTemplate(this.idx, product, count, stock, sum);
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
