import { Actions } from '../../../../constants/actions';
import { SEPARATOR } from '../../../../constants/data';
import { ComponentOptions, PageNames, ProductsSortBy, ViewOptions } from '../../../../constants/types';
import Component from '../../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../../core/components/node.core';
import { CurrentRoute } from '../../../../core/router/currentRoute';
import { getTemplate } from './products-control.template';

export default class ProductsControl extends Component {
  static tagName = 'div';
  static className = 'products-control';
  private $productsSort: DomNode | false;
  private $productsView: DomNode | false;
  private $productsSortDropDown: DomNode | false;
  private $productsViewDropDown: DomNode | false;

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'ProductsControl',
      listeners: ['click'],
    });
    this.$productsSort = false;
    this.$productsView = false;
    this.$productsSortDropDown = false;
    this.$productsViewDropDown = false;
  }

  init() {
    super.init();
    this.$productsSort = this.$root.find('#products-sort');
    this.$productsView = this.$root.find('#products-view');
    this.$productsSortDropDown = this.$root.find('[data-for-id="products-sort"]');
    this.$productsViewDropDown = this.$root.find('[data-for-id="products-view"]');
  }

  private toggleDropDown($el: DomNode, $menu: DomNode) {
    $el.toggle('show');
    $menu.toggle('show');
    $el.attr('aria-expanded', 'true');
  }

  onClick(e: Event) {
    e.preventDefault();
    const $target = wrapperNode(e.target as HTMLElement);
    if (this.$productsSort && this.$productsView && this.$productsSortDropDown && this.$productsViewDropDown) {
      const isProductsSort = $target.attr('id') === this.$productsSort.attr('id');
      const isProductsView = $target.attr('id') === this.$productsView.attr('id');
      const isSortDropdownItem = $target.hasClass('sort');
      const isViewDropdownItem = $target.hasClass('view');
      if (isSortDropdownItem) {
        const sortByValue = $target.data('dropdownValue');
        this.store.setProductsSortBy(sortByValue as ProductsSortBy);

        let path = `${PageNames.main}/?`;
        let category = 'category=';
        let brand = 'brand=';
        let stock = 'stock=';
        let price = 'price=';
        let search = 'search=';
        let sort = 'sort=';
        let view = 'view=';

        if (this.store.getCheckedCategories().length) {
          category = `${category}${this.store.getCheckedCategories().join(SEPARATOR)}`;
          path = `${path}${category}`;
        }

        if (this.store.getCheckedBrands().length) {
          brand = `${brand}${this.store.getCheckedBrands().join(SEPARATOR)}`;
          path = `${path}&${brand}`;
        }

        if (isFinite(this.store.getMinMaxPrices()[0])) {
          price = `${price}${this.store.getMinMaxPrices().join(SEPARATOR)}`;
          path = `${path}&${price}`;
        }

        if (isFinite(this.store.getMinMaxStock()[0])) {
          stock = `${stock}${this.store.getMinMaxStock().join(SEPARATOR)}`;
          path = `${path}&${stock}`;
        }

        if (this.store.getSearchText()) {
          search = `${search}${this.store.getSearchText()}`;
          path = `${path}&${search}`;
        }

        if (this.store.getProductsViewBy()) {
          view = `${view}${this.store.getProductsViewBy()}`;
          path = `${path}&${view}`;
        }

        sort = `${sort}${this.store.getProductsSortBy()}`;
        path = `${path}&${sort !== 'sort=' ? sort : ''}`;

        CurrentRoute.navigate(path);
      }
      if (isViewDropdownItem) {
        const viewByValue = $target.data('dropdownValue');
        this.store.setProductsViewBy(viewByValue as ViewOptions);

        let path = `${PageNames.main}/?`;
        let category = 'category=';
        let brand = 'brand=';
        let stock = 'stock=';
        let price = 'price=';
        let search = 'search=';
        let sort = 'sort=';
        let view = 'view=';

        if (this.store.getCheckedCategories().length) {
          category = `${category}${this.store.getCheckedCategories().join(SEPARATOR)}`;
          path = `${path}${category}`;
        }

        if (this.store.getCheckedBrands().length) {
          brand = `${brand}${this.store.getCheckedBrands().join(SEPARATOR)}`;
          path = `${path}&${brand}`;
        }

        if (isFinite(this.store.getMinMaxPrices()[0])) {
          price = `${price}${this.store.getMinMaxPrices().join(SEPARATOR)}`;
          path = `${path}&${price}`;
        }

        if (isFinite(this.store.getMinMaxStock()[0])) {
          stock = `${stock}${this.store.getMinMaxStock().join(SEPARATOR)}`;
          path = `${path}&${stock}`;
        }

        if (this.store.getSearchText()) {
          search = `${search}${this.store.getSearchText()}`;
          path = `${path}&${search}`;
        }

        if (this.store.getProductsSortBy()) {
          sort = `${sort}${this.store.getProductsSortBy()}`;
          path = `${path}&${sort}`;
        }

        view = `${view}${this.store.getProductsViewBy()}`;
        path = `${path}&${view !== 'view=' ? view : ''}`;

        CurrentRoute.navigate(path);
      }
      if (isProductsSort) {
        this.toggleDropDown(this.$productsSort, this.$productsSortDropDown);
      }
      if (isProductsView) {
        this.toggleDropDown(this.$productsView, this.$productsViewDropDown);
      }
    }
  }

  render() {
    return getTemplate({
      productsFoundCount: this.store.getProductsFoundCount(),
      sortBy: this.store.getProductsSortBy(),
      viewBy: this.store.getProductsViewBy(),
    });
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
