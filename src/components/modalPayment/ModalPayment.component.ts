import Component from '../../core/components/component.core';
import { DomNode, wrapperNode } from '../../core/components/node.core';
import { getModalTemplate } from './modalPayment.template';
import { ComponentOptions } from '../../constants/types';
import { Actions } from '../../constants/actions';
import { validAddress, validCard, validCardDate, validCVV, validEmail, validName, validPhone } from '../../utils/validations';

export default class ModalPayment extends Component {
  static tagName = 'div';
  static className = 'modal hidden';
  private $btnSubmit: DomNode | false;
  private $btnClose: DomNode | false;
  private $inputName: DomNode | false;
  private $inputNumber: DomNode | false;
  private $inputAdress: DomNode | false;
  private $inputEmail: DomNode | false;
  private $inputCardNumber: DomNode | false;
  private $inputCardValid: DomNode | false;
  private $inputCardCVV: DomNode | false;

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'ModalPayment',
      listeners: ['click'],
    });
    this.$btnSubmit = false;
    this.$btnClose = false;
    this.$modalForm = false;
    this.$inputName = false;
    this.$inputNumber = false;
    this.$inputAdress = false;
    this.$inputEmail = false;
    this.$inputCardNumber = false;
    this.$inputCardValid = false;
    this.$inputCardCVV = false;
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
    this.$inputAdress = this.$root.find(`#input-modal-adress`);
    this.$inputEmail = this.$root.find(`#input-modal-email`);
    this.$inputCardNumber = this.$root.find(`#input-card-number`);
    this.$inputCardValid = this.$root.find(`#input-card-valid`);
    this.$inputCardCVV = this.$root.find(`#input-card-cvv`);

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
        if (this.$inputName && this.$inputNumber && this.$inputAdress && this.$inputEmail && this.$inputCardNumber && this.$inputCardValid && this.$inputCardCVV) {
          if (validName(this.$inputName.text() as string) === false) {
            this.$inputName.addClass('is-invalid');
          }
          if (validPhone(this.$inputNumber.text() as string) === false) {
            this.$inputNumber.addClass('is-invalid');
          }
          if (validAddress(this.$inputAdress.text() as string) === false) {
            this.$inputAdress.addClass('is-invalid');
          }
          if (validEmail(this.$inputEmail.text() as string) === false) {
            this.$inputEmail.addClass('is-invalid');
          }
          if (validEmail(this.$inputEmail.text() as string) === false) {
            this.$inputEmail.addClass('is-invalid');
          }
          if (validCard(this.$inputCardNumber.text() as string) === false) {
            this.$inputCardNumber.addClass('is-invalid');
          }
          if (validCardDate(this.$inputCardValid.text() as string) === false) {
            this.$inputCardValid.addClass('is-invalid');
          }
          if (validCVV(this.$inputCardCVV.text() as string) === false) {
            this.$inputCardCVV.addClass('is-invalid');
          }
        }
      }
    }
  }

  onSubmit(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    if (this.$btnSubmit) {
      const isBtnSubmit = $target.attr('id') === this.$btnSubmit.attr('id');
      if (isBtnSubmit) {
        console.log('isBtnSubmit')
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