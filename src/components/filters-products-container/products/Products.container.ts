import Component from '../../../core/components/component.core';
import { createNode, DomNode } from '../../../core/components/node.core';
import { getTemplate } from './products.template';
import ProductsContainer from './products-container/index';
import { ComponentOptions } from '../../../constants/types';

type ComponentsClasses = typeof ProductsContainer;
type ComponentsInstances = ProductsContainer;

export default class Products extends Component {
  static tagName = 'div';
  static className = 'products';

  componentsClass: ComponentsClasses[];
  componentsInstance: ComponentsInstances[];

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'Products',
      listeners: [],
    });

    this.componentsClass = [ProductsContainer];
    this.componentsInstance = [];
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

    this.componentsClass.forEach((Comp: ComponentsClasses) => {
      const classes = Comp.className.split(' ');
      const tagName = (Comp.tagName as keyof HTMLElementTagNameMap) ?? 'div';
      const $el = createNode({ tag: tagName, classes });

      const component = new Comp($el, { ...componentOptions, name: '', listeners: [] });
      $el.html(component.render());
      this.$root.append($el);
      this.componentsInstance.push(component);
    });
    this.componentsInstance.forEach((component) => component.init());
  }

  render() {
    return getTemplate();
  }

  destroy() {
    super.destroy();
    this.$root.clear();

    this.componentsInstance.forEach((component) => {
      component.destroy();
    });
  }
}
