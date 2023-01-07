import Component from '../../../../core/components/component.core';
import { createNode, DomNode } from '../../../../core/components/node.core';
import { renderContainer } from './Products-container.template';
import { ComponentOptions } from '../../../../constants/types';
import ProductCard from './productCard/index';

type ComponentsClasses = typeof ProductCard;
type ComponentsInstances = ProductCard;

export default class ProductsContainer extends Component {
  static tagName = 'div';
  static className = 'products-container';

  componentsClass: ComponentsClasses[];
  componentsInstance: ComponentsInstances[];

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'Container',
      listeners: [],
    });
    this.componentsClass = [];
    this.componentsInstance = [];
    this.productCardAppendPoint = false;
  }

  init() {
    super.init();
    this.renderComponents();
  }

  renderComponents() {
    const componentOptions = {
      observer: this.observer,
      store: this.store,
    };
    this.store.getProductsForView().forEach((product) => {
      const tagName = (ProductCard.tagName as keyof HTMLElementTagNameMap) ?? 'div';
      const classes = ProductCard.className.split(' ');
      const $el = createNode({ tag: tagName, classes });
      const component = new ProductCard($el, { ...componentOptions, name: '', listeners: [] }, product);
      $el.html(component.render());
      this.$root.append($el);
      this.componentsInstance.push(component);
    });
    this.componentsInstance.forEach((component) => component.init());
  }

  render() {
    return renderContainer();
  }

  destroy() {
    super.destroy();
    this.$root.clear();
    this.componentsInstance.forEach((component) => {
      component.destroy();
    });
  }
}
