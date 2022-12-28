import { Actions } from '../../../../constants/actions';
import { ComponentOptions, ProductsSortBy } from '../../../../constants/types';
import Component from '../../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../../core/components/node.core';
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
      if (isSortDropdownItem) {
        const sortByValue = $target.data('dropdownValue');
        this.store.setProductsSortBy(sortByValue as ProductsSortBy);
        this.store.sortingProducts(this.store.state.products);
        this.emit(Actions.APPLY_PRODUCTS_SORT);
      }
      if (isProductsSort) {
        this.toggleDropDown(this.$productsSort, this.$productsSortDropDown);
      }
      if (isProductsView) {
        //TODO
      }
    }
  }

  render() {
    return getTemplate({
      productsFoundCount: this.store.getProductsFoundCount(),
      sortBy: this.store.getProductsSortBy(),
    });
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
