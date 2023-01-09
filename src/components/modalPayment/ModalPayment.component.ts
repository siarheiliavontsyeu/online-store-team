import Component from '../../core/components/component.core';
import { DomNode, wrapperNode } from '../../core/components/node.core';
import { getModalTemplate } from './modalPayment.template';
import { ComponentOptions } from '../../constants/types';
import { Actions } from '../../constants/actions';

export default class ModalPayment extends Component {
  static tagName = 'div';
  static className = 'modal hidden';
  private $btnSubmit: DomNode | false;
  private $btnClose: DomNode | false;

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'ModalPayment',
      listeners: ['click'],
    });
    this.$btnSubmit = false;
    this.$btnClose = false;
  }

  init() {
    super.init();
    const isModalOpen = this.store.getUrlParams() === 'modal';
    if (isModalOpen) {
      this.$root.removeClass('hidden');
    }
    this.$btnSubmit = this.$root.find(`#btn-submit-buy`);
    this.$btnClose = this.$root.find(`#btn-close-modal`);
    this.subscribe(Actions.PRODUCT_PAGE_OPEN_MODAL, () => {
      this.$root.removeClass('hidden');
    });
  }

  onClick(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    if (this.$btnSubmit && this.$btnClose) {
      const isBtnClose = $target.attr('id') === this.$btnClose.attr('id');
      const isBtnSubmit = $target.attr('id') === this.$btnSubmit.attr('id');
      if (isBtnClose) {
        this.$root.addClass('hidden');
      }
      if (isBtnSubmit) {
        //TODO
      }
    }
  }

  render() {
    return getModalTemplate();
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
