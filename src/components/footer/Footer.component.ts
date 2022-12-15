import Component, { ComponentOptions } from '../../core/components/component.core';
import { DomNode } from '../../core/components/node.core';

export default class Footer extends Component {
  static tagName = 'footer';
  static className = 'footer';

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'Footer',
      listeners: [],
    });
  }

  init() {
    super.init();
  }

  render() {
    return 'Footer';
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
