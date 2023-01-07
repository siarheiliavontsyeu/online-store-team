import { Actions } from '../../../constants/actions';
import { CartI, ComponentOptions, PageNames } from '../../../constants/types';
import Component from '../../../core/components/component.core';
import { createNode, DomNode, wrapperNode } from '../../../core/components/node.core';
import { CurrentRoute } from '../../../core/router/currentRoute';
import { paginateArr } from '../../../utils/helpers.utils';
import Product from '../product/index';
import { getTemplate } from './productsInCart.template';

type ComponentsInstances = Product;

export default class ProductsInCart extends Component {
  static tagName = 'div';
  static className = 'products-incart';
  private $productsAppendPoint: DomNode | false;
  private componentsInstance: ComponentsInstances[];
  private $changeLimit: DomNode | false;
  private $changePage: DomNode | false;
  private limit: number;
  private page: number;
  private cart: CartI[];

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'ProductsInCart',
      listeners: ['click'],
    });
    this.componentsInstance = [];
    this.$productsAppendPoint = false;
    this.$changeLimit = false;
    this.$changePage = false;
    this.limit = 3;
    this.page = 1;
    this.cart = [];
  }

  init() {
    super.init();
    this.$productsAppendPoint = this.$root.find('.products-incart-container');
    this.$changeLimit = this.$root.find('#limit');
    this.$changePage = this.$root.find('#page');
    this.renderComponents();

    this.subscribe(Actions.PRODUCT_DROP_IN_LAST_CART_PAGE, () => {
      if (this.$changeLimit) {
        let path = `${PageNames.cart}/?`;
        let limit = 'limit=';
        let page = 'page=';
        const pageNumber = this.page > 0 ? this.page - 1 : 1;

        limit = `${limit}${this.$changeLimit.text() as string}`;
        page = `${page}${pageNumber}`;
        path = `${path}${limit}&${page}`;
        CurrentRoute.navigate(path);
      }
    });
  }

  onClick(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    if (this.$changeLimit && this.$changePage) {
      const isChangeLimit = $target.attr('id') === this.$changeLimit.attr('id');
      const isChangePage = $target.attr('id') === this.$changePage.attr('id');
      if (isChangeLimit || isChangePage) {
        let path = `${PageNames.cart}/?`;
        let limit = 'limit=';
        let page = 'page=';

        if (isChangeLimit) {
          limit = `${limit}${this.$changeLimit.text() as string}`;
          page = `${page}${String(Math.ceil(this.cart.length / this.limit))}`;
          path = `${path}${limit}&${page}`;
        }
        if (isChangePage) {
          limit = `${limit}${this.$changeLimit.text() as string}`;
          page = `${page}${this.$changePage.text() as string}`;
          path = `${path}${limit}&${page}`;
        }
        CurrentRoute.navigate(path);
      }
    }
  }

  renderComponents() {
    const componentOptions = {
      observer: this.observer,
      store: this.store,
    };
    const cart = this.store.getCart();
    this.cart = paginateArr(cart, this.limit, this.page);

    this.cart.forEach((product) => {
      const tagName = (Product.tagName as keyof HTMLElementTagNameMap) ?? 'div';
      const classes = Product.className.split(' ');
      const $el = createNode({ tag: tagName, classes });
      const index = cart.findIndex((el) => el.id === product.id);
      const component = new Product($el, { ...componentOptions, name: '', listeners: [] }, product, index + 1);
      $el.html(component.render());
      this.$productsAppendPoint && this.$productsAppendPoint.append($el);
      this.componentsInstance.push(component);
    });

    this.componentsInstance.forEach((component) => component.init());
  }

  render() {
    const { limit = '3', page = '1' } = this.store.getLimitPageFromUrl();
    this.limit = parseInt(limit);
    this.page = parseInt(page);
    return getTemplate(this.store.getCart(), this.limit, this.page);
  }

  destroy() {
    super.destroy();
    this.$root.clear();
    this.componentsInstance.forEach((component) => {
      component.destroy();
    });
  }
}
