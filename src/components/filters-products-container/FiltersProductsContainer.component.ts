import { ComponentOptions } from '../../constants/types';
import Component from '../../core/components/component.core';
import { createNode, DomNode } from '../../core/components/node.core';
import Filters from './filters/index';
import Products from './products/index';
import { getTemplate } from './filtersProductsContainer.template';

type ComponentsClasses = typeof Filters | typeof Products;
type ComponentsInstances = Filters | Products;

export default class FiltersProductsContainer extends Component {
  static tagName = 'div';
  static className = 'filters-products container d-flex';
  componentsClass: ComponentsClasses[];
  componentsInstance: ComponentsInstances[];

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'FiltersProductsContainer',
      listeners: [],
    });
    this.componentsClass = [Filters, Products];
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
