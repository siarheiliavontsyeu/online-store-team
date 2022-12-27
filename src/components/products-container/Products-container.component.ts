import Component from '../../core/components/component.core';
import { createNode, DomNode } from '../../core/components/node.core';
import { renderContainer } from './Products-container.template';
import { ComponentOptions, ProductI } from '../../constants/types';
import productCard from './productCard/index';
import { Actions } from '../../constants/actions';

type ComponentsClasses = typeof productCard;
type ComponentsInstances = productCard;
export default class ProductsContainer extends Component {
  static tagName = 'div';
  static className = 'products';
  private productCardAppendPoint: DomNode | false;

  componentsClass: ComponentsClasses[];
  componentsInstance: ComponentsInstances[];

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
    this.productCardAppendPoint = this.$root.find('.products-container');
    this.renderComponents();
    this.subscribe(Actions.APPLY_PRODUCT_FILTER, () => {
      this.update();
      });
  }

  renderComponents() {
    const componentOptions = {
      observer: this.observer,
      store: this.store,
    };

    const className = productCard.className;
    const tagName = (productCard.tagName as keyof HTMLElementTagNameMap) ?? 'div';
    const classes = [className];
    this.store.state.products.forEach((comp) => {
      const $el = createNode({ tag: tagName, classes });
      const component = new productCard($el, { ...componentOptions, name: '', listeners: [] }, comp);
      $el.html(component.render());
      if (this.productCardAppendPoint) {
        this.productCardAppendPoint.append($el);
      }
      this.componentsInstance.push(component);
    })
    this.componentsInstance.forEach((component) => component.init());
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
    if (this.productCardAppendPoint) {
      this.productCardAppendPoint.clear();
    }
    this.componentsInstance.forEach((component) => {
      component.destroy();
    });
  }
}