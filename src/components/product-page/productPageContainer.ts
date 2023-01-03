import Header from '../header/Header.component';
import Footer from '../footer/index';
import Store from '../../core/store/store.core';
import Observer from '../../core/components/observer.core';
import { createNode } from '../../core/components/node.core';
import ProductDetails from '../details/index';
import { ProductI } from '../../constants/types';

type ComponentsClasses = typeof ProductDetails ;
type ComponentsInstances = ProductDetails;

export class ProductPageContainer {
    componentsClass: ComponentsClasses[];
    componentsInstance: ComponentsInstances[];
    observer: Observer;

    private cardData: ProductI;

    constructor(public store: Store, cardData: ProductI) {
        this.componentsClass = [ProductDetails];
        this.componentsInstance = [];
        this.observer = new Observer();
        this.store = store;
        this.cardData = cardData;
    }

    render() {
        const $root = createNode({ tag: 'div', classes: ['product-page', 'min-vh-100'] });
        const componentOptions = {
            observer: this.observer,
            store: this.store,
        };

        this.componentsClass.forEach((Comp: ComponentsClasses) => {
            const classes = Comp.className.split(' ');
            console.log(Comp.className ==='header')
            const tagName = (Comp.tagName as keyof HTMLElementTagNameMap) ?? 'div';
            const $el = createNode({ tag: tagName, classes });

            const component = new Comp($el, { ...componentOptions, name: '', listeners: [] }, this.cardData);
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