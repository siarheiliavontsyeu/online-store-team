import Component from '../../core/components/component.core';
import {createNode, DomNode } from '../../core/components/node.core';
import { renderContainer } from './Products-container.template';
import { ComponentOptions} from '../../constants/types';
import productCard from './productCard/index';

type ComponentsClasses = typeof productCard;
export default class ProductsContainer extends Component {
    static tagName = 'div';
    static className = 'products-container';

    componentsClass: ComponentsClasses[];
    componentsInstance: ComponentsClasses[];
  
    constructor($root: DomNode, options: ComponentOptions) {
      super($root, {
        ...options,
        name: 'Container',
        listeners: ['click'],
      });
      this.componentsClass = [productCard];
      this.componentsInstance = [];
      this.productCardAppendPoint = false;
    }
  
    init() {
      super.init();
      this.productCardAppendPoint = this.$root.find('.product-container');
      this.renderComponents;
    }

    renderComponents() {
      const componentOptions = {
        observer: this.observer,
        store: this.store,
      };
  
      this.componentsClass.forEach((Comp: ComponentsClasses) => {
        const className = Comp.className;
        const tagName = (Comp.tagName as keyof HTMLElementTagNameMap) ?? 'div';
        const classes = [className];
        const $el = createNode({ tag: tagName, classes });
    })
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