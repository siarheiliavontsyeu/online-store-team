import Component, { ComponentOptions } from '../../core/components/component.core';
import { DomNode } from '../../core/components/node.core';

export default class Header extends Component {
  static tagName = 'header';
  static className = 'header';

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'Header',
      listeners: ['click'],
    });
  }

  init() {
    super.init();
  }

  onClick(e: Event) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return 'Header';
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
