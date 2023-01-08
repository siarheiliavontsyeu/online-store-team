import { Actions } from '../../constants/actions';
import { ComponentOptions } from '../../constants/types';
import Component from '../../core/components/component.core';
import { createNode, DomNode } from '../../core/components/node.core';
import ProductsInCart from './products-incart/index';
import { getTemplate } from './productsInCartContainer.template';
import Summary from './summary/index';

type ComponentsClasses = typeof ProductsInCart | typeof Summary;
type ComponentsInstances = ProductsInCart | Summary;

export default class ProductsInCartContainer extends Component {
  static tagName = 'div';
  static className = 'products-summary container d-flex justify-content-between';
  componentsClass: ComponentsClasses[];
  componentsInstance: ComponentsInstances[];

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'ProductsInCartContainer',
      listeners: [],
    });
    this.componentsClass = [ProductsInCart, Summary];
    this.componentsInstance = [];
  }

  init() {
    super.init();
    if (this.store.getCart().length > 0) {
      this.renderComponents();
    } else {
      const $el = createNode({ tag: 'h2', classes: ['text-info'], innerText: 'Cart is Empty' });
      this.$root.append($el);
    }
    this.subscribe(Actions.PRODUCT_ADD_TO_CART, () => {
      this.update();
    });
    this.subscribe(Actions.PRODUCT_DROP_FROM_CART, () => {
      this.update();
    });
    this.subscribe(Actions.PROMO_CODE_ADD, () => {
      this.update();
    });
    this.subscribe(Actions.PROMO_CODE_DROP, () => {
      this.update();
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
