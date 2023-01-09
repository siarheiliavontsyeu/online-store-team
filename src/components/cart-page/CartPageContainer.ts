import { createNode } from '../../core/components/node.core';
import Observer from '../../core/components/observer.core';
import Store from '../../core/store/store.core';
import Footer from '../footer/index';
import Header from '../header/Header.component';
import ModalPayment from '../modalPayment/index';
import ProductsInCartContainer from '../products-incart-container/index';

type ComponentsClasses = typeof Header | typeof ProductsInCartContainer  | typeof Footer;
type ComponentsInstances = Header | ProductsInCartContainer  | Footer;

export class CartPageContainer {
  componentsClass: ComponentsClasses[];
  componentsInstance: ComponentsInstances[];
  observer: Observer;

  constructor(public store: Store) {
    this.componentsClass = [Header, ProductsInCartContainer, Footer];
    this.componentsInstance = [];
    this.observer = new Observer();
    this.store = store;
  }

  render() {
    const $root = createNode({ tag: 'div', classes: ['main-page', 'd-flex', 'flex-column', 'min-vh-100'] });
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
      $root.append($el);
      this.componentsInstance.push(component);
    });

    return $root;
  }

  init() {
    this.componentsInstance.forEach((component) => component.init());
  }

  destroy() {
    this.componentsInstance.forEach((component) => component.destroy());
  }
}
