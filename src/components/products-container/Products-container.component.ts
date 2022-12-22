import Component from '../../core/components/component.core';
import {createNode, DomNode } from '../../core/components/node.core';
import { renderContainer } from './Products-container.template';
import { ComponentOptions} from '../../constants/types';
import productCard from './productCard/index';

export default class ProductsContainer extends Component {
    static tagName = 'div';
    static className = 'products-container';

    componentsClass: (typeof productCard)[];
    componentsInstance: productCard[];
  
    constructor($root: DomNode, options: ComponentOptions) {
      super($root, {
        ...options,
        name: 'Container',
        listeners: ['click'],
      });
      this.componentsClass = [productCard];
      this.componentsInstance = [];
    }
  
    init() {
      super.init();
      this.productCardAppendPoint = this.$root.find('.product-container');
      this.renderComponents;
    }

    renderComponents() {
      
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