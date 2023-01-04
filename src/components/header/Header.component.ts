import Component from '../../core/components/component.core';
import { DomNode, wrapperNode } from '../../core/components/node.core';
import './Header.css';
import { ComponentOptions, FilterBy, PageNames } from '../../constants/types';
import { Actions } from '../../constants/actions';
import { getTemplate } from './header.template';
import { CurrentRoute } from '../../core/router/currentRoute';
import { SEPARATOR } from '../../constants/data';

export default class Header extends Component {
  static tagName = 'header';
  static className = 'header';
  private $productsSearch: DomNode | false;
  private $productsSearchBtn: DomNode | false;

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'Header',
      listeners: ['click', 'submit'],
    });
    this.$productsSearch = false;
    this.$productsSearchBtn = false;
  }

  init() {
    super.init();
    this.$productsSearch = this.$root.find('#products-search');
    this.$productsSearch && this.$productsSearch.text(this.store.getSearchText());
    this.$productsSearchBtn = this.$root.find('#products-search-btn');
    this.subscribe(Actions.APPLY_PRODUCT_FILTER, () => {
      this.update();
    });
  }

  handleSearch(e: Event) {
    e.preventDefault();
    if (this.$productsSearch && this.$productsSearchBtn) {
      const searchText = (this.$productsSearch.text() as string).trim();

      let path = `${PageNames.main}/?`;
      let category = 'category=';
      let brand = 'brand=';
      let stock = 'stock=';
      let price = 'price=';
      let search = 'search=';

      if (this.store.getCheckedCategories().length) {
        category = `${category}${this.store.getCheckedCategories().join(SEPARATOR)}`;
        path = `${path}${category}`;
      }

      if (this.store.getCheckedBrands().length) {
        brand = `${brand}${this.store.getCheckedBrands().join(SEPARATOR)}`;
        path = `${path}&${brand}`;
      }

      if (this.store.getSearchText()) {
        search = `${search}${this.store.getSearchText()}`;
        path = `${path}&${search}`;
      }

      if (isFinite(this.store.getMinMaxPrices()[0])) {
        price = `${price}${this.store.getMinMaxPrices().join(SEPARATOR)}`;
        path = `${path}${price}`;
      }

      if (isFinite(this.store.getMinMaxStock()[0])) {
        stock = `${stock}${this.store.getMinMaxStock().join(SEPARATOR)}`;
        path = `${path}&${stock}`;
      }

      this.store.setSearchText(searchText);
      this.store.setFilterBy(FilterBy.text);

      search = `${search}${this.store.getSearchText()}`;
      path = `${path}&${search}`;

      CurrentRoute.navigate(path);
    }
  }

  onClick(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    if (this.$productsSearch && this.$productsSearchBtn) {
      const isProductsSearchBtn = $target.attr('id') === this.$productsSearchBtn.attr('id');
      if (isProductsSearchBtn) {
        this.handleSearch(e);
      }
    }
  }

  onSubmit(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    if (this.$productsSearch) {
      const isProductsSearch = $target.attr('id') === this.$productsSearch.attr('id');
      if (isProductsSearch) {
        this.handleSearch(e);
      }
    }
  }

  render() {
    return getTemplate(0, 0);
  }

  destroy() {
    super.destroy();
  }
}
