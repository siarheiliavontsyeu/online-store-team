import Component from '../../core/components/component.core';
import { DomNode } from '../../core/components/node.core';
import { getTemplate } from './NotFound.template';
import { ComponentOptions } from '../../constants/types';

export default class NotFound extends Component {
  static tagName = 'div';
  static className = 'not-found d-flex';

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'NotFound',
      listeners: [],
    });
  }

  init() {
    super.init();
  }

  render() {
    return getTemplate();
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}