import Component, { ComponentOptions } from '../../core/components/component.core';
import { DomNode } from '../../core/components/node.core';
import { getTemplate } from './filters.template';

export default class Filters extends Component {
  static tagName = 'div';
  static className = 'filters';

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'Filters',
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
