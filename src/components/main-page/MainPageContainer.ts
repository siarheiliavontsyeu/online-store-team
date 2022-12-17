import { createNode } from '../../core/components/node.core';
import Observer from '../../core/components/observer.core';
import Store from '../../core/store/store.core';
import Footer from '../footer/Footer.component';
import Header from '../header/Header.component';

type ComponentsClasses = typeof Header | typeof Footer;
type ComponentsInstances = Header | Footer;

export class MainPageContainer {
  componentsClass: ComponentsClasses[];
  componentsInstance: ComponentsInstances[];
  observer: Observer;

  constructor(public store: Store) {
    this.componentsClass = [Header, Footer];
    this.componentsInstance = [];
    this.observer = new Observer();
    this.store = store;
  }

  render() {
    const $root = createNode({ tag: 'div', classes: ['container', 'main-page'] });

    const componentOptions = {
      observer: this.observer,
      store: this.store,
    };

    this.componentsClass.forEach((Comp: ComponentsClasses) => {
      const className = Comp.className;
      const tagName = (Comp.tagName as keyof HTMLElementTagNameMap) ?? 'div';
      const $el = createNode({ tag: tagName, classes: [className] });
      const component = new Comp($el, { ...componentOptions, name: '', listeners: [] });
      $el.html(component.render());
      $root.append($el);
      this.componentsInstance.push(component);
    });

    console.log($root);

    return $root;
  }

  init() {
    this.componentsInstance.forEach((component) => component.init());
  }

  destroy() {
    this.componentsInstance.forEach((component) => component.destroy());
  }
}
