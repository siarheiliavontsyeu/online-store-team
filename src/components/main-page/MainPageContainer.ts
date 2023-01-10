import { createNode } from '../../core/components/node.core';
import Observer from '../../core/components/observer.core';
import Store from '../../core/store/store.core';

import Footer from '../footer/index';

import Header from '../header/Header.component';
import FiltersProductsContainer from '../filters-products-container/index';

type ComponentsClasses = typeof Header | typeof Footer | typeof FiltersProductsContainer;
type ComponentsInstances = Header | Footer | FiltersProductsContainer;

export class MainPageContainer {
  componentsClass: ComponentsClasses[];
  componentsInstance: ComponentsInstances[];
  observer: Observer;

  constructor(public store: Store) {
    this.componentsClass = [Header, FiltersProductsContainer, Footer];
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
