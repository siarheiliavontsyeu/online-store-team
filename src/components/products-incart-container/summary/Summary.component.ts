import { Actions } from '../../../constants/actions';
import { ComponentOptions } from '../../../constants/types';
import Component from '../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../core/components/node.core';
import { getTemplate } from './summary.template';

export default class Summary extends Component {
  static tagName = 'div';
  static className = 'cart-summary';
  private $inputPromoAdd: DomNode | false;
  private $btnBuyNow: DomNode | false;

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'Summary',
      listeners: ['click', 'input'],
    });
    this.$inputPromoAdd = false;
    this.$btnBuyNow = false;
  }

  find(selector: string) {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      return wrapperNode(element);
    }
    return false;
  }
  init() {
    super.init();
    this.$inputPromoAdd = this.$root.find('#add-promo');
    this.$btnBuyNow = this.$root.find('#buy-now');
  }

  onClick(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    if ($target.hasClass('js-drop') || $target.hasClass('fa-trash-alt')) {
      const promoCode = $target.data('promo');
      if (promoCode) {
        this.store.dropPromoCode(promoCode);
        this.emit(Actions.PROMO_CODE_DROP);
      }
    }

    if (this.$btnBuyNow) {
      const isBtnBuyNow = $target.attr('id') === this.$btnBuyNow.attr('id') || $target.hasClass('fa-money-check');
      if (isBtnBuyNow) {
        this.emit(Actions.PRODUCT_PAGE_OPEN_MODAL);
      }
    }
  }

  onInput(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    if (this.$inputPromoAdd) {
      const isInputPromoAdd = $target.attr('id') === this.$inputPromoAdd.attr('id');
      if (isInputPromoAdd) {
        const value = this.$inputPromoAdd.text() as string;
        const promoCode = this.store.pickPromoCode(value);
        if (promoCode) {
          this.emit(Actions.PROMO_CODE_ADD);
        }
      }
    }
  }

  render() {
    return getTemplate(this.store.getSummary(), this.store.getInitialPromoCodes(), this.store.getPromoCodes());
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
