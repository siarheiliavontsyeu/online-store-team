import Component, { ComponentOptions } from '../../core/components/component.core';
import { DomNode } from '../../core/components/node.core';
import { renderTemplate } from './Header.template';
import './Header.css';

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
    this.emit('header:test');
    console.log(this.store);
  }

  render() {
    return renderTemplate(0,0);
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
