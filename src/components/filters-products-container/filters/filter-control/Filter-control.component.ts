import { Actions } from '../../../../constants/actions';
import { ComponentOptions, FilterBy } from '../../../../constants/types';
import Component from '../../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../../core/components/node.core';
import { getTemplate } from './filter-control.template';

export default class FilterControl extends Component {
  static tagName = 'div';
  static className = 'filter-control';
  private $btnReset: DomNode | false;
  private $btnCopy: DomNode | false;

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'FilterControl',
      listeners: ['click'],
    });
    this.$btnReset = false;
    this.$btnCopy = false;
  }

  init() {
    super.init();
    this.$btnReset = this.$root.find('#filters-reset');
    this.$btnCopy = this.$root.find('#filters-copy');
  }

  onClick(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    if (this.$btnReset && this.$btnCopy) {
      const isBtnReset = $target.attr('id') === this.$btnReset.attr('id');
      const isBtnCopy = $target.attr('id') === this.$btnCopy.attr('id');
      if (isBtnReset) {
        this.store.setCheckedCategories([]);
        this.store.setCheckedBrands([]);
        this.store.setMinMaxStock(this.store.state.initialStocks);
        this.store.setMinMaxPrices(this.store.state.initialPrices);
        this.store.setSearchText('');
        this.store.setFilterBy(FilterBy.null);
        this.store.filterProducts();
        this.emit(Actions.APPLY_PRODUCT_FILTER);
      }
      if (isBtnCopy) {
        navigator.clipboard
          .writeText(window.location.href) // TODO get correct url
          .then(() => {
            const currentInnerHtml = this.$btnCopy && this.$btnCopy.html();
            this.$btnCopy && this.$btnCopy.html('<i class="fas fa-check-double"></i> Copied!');
            setTimeout(() => {
              this.$btnCopy && this.$btnCopy.html(currentInnerHtml as string);
            }, 1000);
          })
          .catch((err: Error) => {
            console.error('Something went wrong', err.message);
          });
      }
    }
  }

  render() {
    return getTemplate();
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
