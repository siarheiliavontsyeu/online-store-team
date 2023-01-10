import Component from '../../core/components/component.core';
import { DomNode, wrapperNode } from '../../core/components/node.core';
import { getModalTemplate } from './modalPayment.template';
import { ComponentOptions, PageNames } from '../../constants/types';
import { Actions } from '../../constants/actions';
import {
  validAddress,
  validCard,
  validCardDate,
  validCVV,
  validEmail,
  validName,
  validPhone,
} from '../../utils/validations';
import { CurrentRoute } from '../../core/router/currentRoute';

export default class ModalPayment extends Component {
  static tagName = 'div';
  static className = 'modal hidden';
  private $btnSubmit: DomNode | false;
  private $btnClose: DomNode | false;
  private $inputName: DomNode | false;
  private $inputNumber: DomNode | false;
  private $inputAddress: DomNode | false;
  private $inputEmail: DomNode | false;
  private $inputCardNumber: DomNode | false;
  private $inputCardValid: DomNode | false;
  private $inputCardCVV: DomNode | false;
  private $alert: DomNode | false;

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'ModalPayment',
      listeners: ['click', 'change'],
    });
    this.$btnSubmit = false;
    this.$btnClose = false;
    this.$modalForm = false;
    this.$inputName = false;
    this.$inputNumber = false;
    this.$inputAddress = false;
    this.$inputEmail = false;
    this.$inputCardNumber = false;
    this.$inputCardValid = false;
    this.$inputCardCVV = false;
    this.$alert = false;
  }

  init() {
    super.init();
    const isModalOpen = this.store.getUrlParams() === 'modal';
    if (isModalOpen) {
      this.$root.removeClass('hidden');
      this.store.setUrlParams('');
    }
    this.$btnSubmit = this.$root.find(`#btn-submit-buy`);
    this.$btnClose = this.$root.find(`#btn-close-modal`);

    this.$modalForm = this.$root.find(`.modal-form`);
    this.$inputName = this.$root.find(`#input-modal-name`);
    this.$inputNumber = this.$root.find(`#input-modal-number`);
    this.$inputAddress = this.$root.find(`#input-modal-adress`);
    this.$inputEmail = this.$root.find(`#input-modal-email`);
    this.$inputCardNumber = this.$root.find(`#input-card-number`);
    this.$inputCardValid = this.$root.find(`#input-card-valid`);
    this.$inputCardCVV = this.$root.find(`#input-card-cvv`);
    this.$alert = this.$root.find(`.alert`);

    this.subscribe(Actions.PRODUCT_PAGE_OPEN_MODAL, () => {
      this.$root.removeClass('hidden');
    });
  }
  private addSlash(el: DomNode) {
    el.text((el.text() as string).substring(0, 2) + '/' + (el.text() as string).substring(2));
  }

  onChange(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    if (this.$inputCardValid) {
      const isInputCardValid = $target.attr('id') === this.$inputCardValid.attr('id');
      if (isInputCardValid) {
        this.addSlash(this.$inputCardValid);
      }
    }
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
        if (
          this.$inputName &&
          this.$inputNumber &&
          this.$inputAddress &&
          this.$inputEmail &&
          this.$inputCardNumber &&
          this.$inputCardValid &&
          this.$inputCardCVV
        ) {
          e.preventDefault();
          let isDataValid = true;
          if (!validName(this.$inputName.text() as string)) {
            this.$inputName.addClass('is-invalid');
            isDataValid = false;
          } else {
            this.$inputName.removeClass('is-invalid');
          }
          if (!validPhone(this.$inputNumber.text() as string)) {
            this.$inputNumber.addClass('is-invalid');
            isDataValid = false;
          } else {
            this.$inputNumber.removeClass('is-invalid');
          }
          if (!validAddress(this.$inputAddress.text() as string)) {
            this.$inputAddress.addClass('is-invalid');
            isDataValid = false;
          } else {
            this.$inputAddress.removeClass('is-invalid');
          }
          if (!validEmail(this.$inputEmail.text() as string)) {
            this.$inputEmail.addClass('is-invalid');
            isDataValid = false;
          } else {
            this.$inputEmail.removeClass('is-invalid');
          }
          if (!validCard(this.$inputCardNumber.text() as string)) {
            this.$inputCardNumber.addClass('is-invalid');
            isDataValid = false;
          } else {
            this.$inputCardNumber.removeClass('is-invalid');
          }
          if (!validCardDate(this.$inputCardValid.text() as string)) {
            this.$inputCardValid.addClass('is-invalid');
            isDataValid = false;
          } else {
            this.$inputCardValid.removeClass('is-invalid');
          }
          if (!validCVV(this.$inputCardCVV.text() as string)) {
            this.$inputCardCVV.addClass('is-invalid');
            isDataValid = false;
          } else {
            this.$inputCardCVV.removeClass('is-invalid');
          }
          if (isDataValid) {
            this.store.clearCart();
            if (this.$alert) {
              this.$alert.removeClass('hidden');
            }
            setTimeout(() => {
              CurrentRoute.navigate(PageNames.main);
            }, 3000);
          }
        }
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
