import Component from '../../core/components/component.core';
import { DomNode } from '../../core/components/node.core';
import { getModalTemplate } from './modalPayment.template';
import { ComponentOptions } from '../../constants/types';

export default class ModalPayment extends Component {
  static tagName = 'div';
  static className = 'modal hidden';

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'ModalPayment',
      listeners: ['click'],
    });
  }

  init() {
    super.init();
  }

  render() {
    return getModalTemplate();
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}