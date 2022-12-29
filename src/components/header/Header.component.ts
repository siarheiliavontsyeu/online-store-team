import Component from '../../core/components/component.core';
import { DomNode, wrapperNode } from '../../core/components/node.core';
import './Header.css';
import { ComponentOptions } from '../../constants/types';
import { Actions } from '../../constants/actions';
import { getTemplate } from './header.template';

export default class Header extends Component {
  static tagName = 'header';
  static className = 'header';
  private $productsSearch: DomNode | false;
  private $productsSearchBtn: DomNode | false;

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'Header',
      listeners: ['click'],
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
      // console.log(this.store.state);
    });
  }

  onClick(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    if (this.$productsSearch && this.$productsSearchBtn) {
      const isProductsSearchBtn = $target.attr('id') === this.$productsSearchBtn.attr('id');
      if (isProductsSearchBtn) {
        e.preventDefault();
        const searchText = (this.$productsSearch.text() as string).trim();
        if (searchText) {
          this.store.setSearchText(searchText);
          this.store.setMinMaxStock(this.store.state.initialStocks);
          this.store.setMinMaxPrices(this.store.state.initialPrices);
          this.store.filterProducts();
          this.emit(Actions.APPLY_PRODUCT_FILTER);
        }
      }
    }
  }

  render() {
    return getTemplate(0, 0);
  }

  destroy() {
    super.destroy();
    // this.$root.clear();
  }
}
