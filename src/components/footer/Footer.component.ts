import Component, { ComponentOptions } from '../../core/components/component.core';
import { DomNode } from '../../core/components/node.core';
import { getTemplate } from './footer.template';

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
    return getTemplate();
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
