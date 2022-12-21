import { StateI } from '../../constants/types';
import Component, { ComponentOptions } from '../../core/components/component.core';
import { DomNode } from '../../core/components/node.core';
import Store from '../../core/store/store.core';
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
    return getTemplate((this.store as Store).state);
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
