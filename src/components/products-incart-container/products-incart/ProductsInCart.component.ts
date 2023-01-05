import { ComponentOptions } from '../../../constants/types';
import Component from '../../../core/components/component.core';
import { createNode, DomNode } from '../../../core/components/node.core';
import Product from '../product/index';
import { getTemplate } from './productsInCart.template';

type ComponentsInstances = Product;

export default class ProductsInCart extends Component {
  static tagName = 'div';
  static className = 'products-incart';
  private $productsAppendPoint: DomNode | false;
  private componentsInstance: ComponentsInstances[];

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'ProductsInCart',
      listeners: [],
    });
    this.componentsInstance = [];
    this.$productsAppendPoint = false;
  }

  init() {
    super.init();
    this.$productsAppendPoint = this.$root.find('.products-incart-container');
    this.renderComponents();
  }

  renderComponents() {
    const componentOptions = {
      observer: this.observer,
      store: this.store,
    };
    this.store.addToCart(1);
    this.store.addToCart(5);
    this.store.addToCart(11);

    this.store.getCart().forEach((product, idx) => {
      const tagName = (Product.tagName as keyof HTMLElementTagNameMap) ?? 'div';
      const classes = Product.className.split(' ');
      const $el = createNode({ tag: tagName, classes });
      const component = new Product($el, { ...componentOptions, name: '', listeners: [] }, product, idx);
      $el.html(component.render());
      this.$productsAppendPoint && this.$productsAppendPoint.append($el);
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
