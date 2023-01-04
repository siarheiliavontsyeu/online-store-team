import { ComponentOptions } from '../../../constants/types';
import Component from '../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../core/components/node.core';
import { getTemplate } from './summary.template';

export default class Summary extends Component {
  static tagName = 'div';
  static className = 'cart-summary';

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'Summary',
      listeners: ['click'],
    });
  }

  init() {
    super.init();
  }

  onClick(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
  }

  render() {
    return getTemplate();
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
