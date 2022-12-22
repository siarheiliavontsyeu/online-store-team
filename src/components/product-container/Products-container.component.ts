import Component from '../../core/components/component.core';
import {createNode, DomNode } from '../../core/components/node.core';
import { renderContainer } from './Products-container.template';
import { ComponentOptions} from '../../constants/types';

export default class ProductsContainer extends Component {
    static tagName = 'div';
    static className = 'products-container';
  
    constructor($root: DomNode, options: ComponentOptions) {
      super($root, {
        ...options,
        name: 'Container',
        listeners: ['click'],
      });
    }
  
    init() {
      super.init();
    }
  
    onClick(e: Event) {
      e.preventDefault();
      this.emit('Product-container:test');
      console.log(this.store);
    }
  
    render() {
      return renderContainer();
    }
  
    destroy() {
      super.destroy();
      this.$root.clear();
    }
  }