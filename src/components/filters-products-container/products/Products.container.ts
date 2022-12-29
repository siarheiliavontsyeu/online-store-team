import Component from '../../../core/components/component.core';
import { createNode, DomNode } from '../../../core/components/node.core';
import { getTemplate } from './products.template';
import ProductsContainer from './products-container/index';
import { ComponentOptions } from '../../../constants/types';
import ProductsControl from './products-control/index';
import { Actions } from '../../../constants/actions';

type ComponentsClasses = typeof ProductsContainer | typeof ProductsControl;
type ComponentsInstances = ProductsContainer | ProductsControl;

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

    this.componentsClass = [ProductsControl, ProductsContainer];
    this.componentsInstance = [];
  }

  init() {
    super.init();
    this.renderComponents();
    this.subscribe(Actions.APPLY_PRODUCT_FILTER, () => {
      this.update();
      console.log(this.store.state);
    });
    this.subscribe(Actions.APPLY_PRODUCTS_SORT, () => {
      this.update();
      // console.log(this.store.state);
    });
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
