import { Actions } from '../../../../constants/actions';
import { FilterDataI, ComponentOptionsFilter, Groups, FilterBy } from '../../../../constants/types';
import Component from '../../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../../core/components/node.core';
import { getTemplate } from './range.template';

export default class Range extends Component {
  static tagName = 'div';
  static className = 'range-filter';

  private data: FilterDataI;
  private $miniSlide: false | DomNode;
  private $maxiSlide: false | DomNode;

  constructor($root: DomNode, options: ComponentOptionsFilter) {
    super($root, {
      ...options,
      name: 'Range',
      listeners: ['change'],
    });
    this.data = options.data;
    this.$miniSlide = false;
    this.$maxiSlide = false;
  }

  init() {
    super.init();
    this.$miniSlide = this.$root.find('#miniSlide');
    this.$maxiSlide = this.$root.find('#maxiSlide');
  }

  onChange(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    if ($target.hasClass('multi-range__slide')) {
      if (this.$miniSlide && this.$maxiSlide) {
        let miniVal = parseInt(this.$miniSlide.text() as string);
        let maxiVal = parseInt(this.$maxiSlide.text() as string);

        if ($target.$el.id === 'maxiSlide') {
          if (maxiVal < miniVal) {
            [miniVal, maxiVal] = [maxiVal, miniVal];
          }
        }
        if ($target.$el.id === 'miniSlide') {
          if (miniVal > maxiVal) {
            [miniVal, maxiVal] = [maxiVal, miniVal];
          }
        }

        if (this.data.group === Groups.Price) {
          this.store.setMinMaxPrices([miniVal, maxiVal]);
        }
        if (this.data.group === Groups.Stock) {
          this.store.setMinMaxStock([miniVal, maxiVal]);
        }
        this.store.setFilterBy(FilterBy.range);
        this.store.filterProducts();
        this.emit(Actions.APPLY_PRODUCT_FILTER);
      }
    }
  }

  render() {
    const products = this.store.getProductsForView();
    return getTemplate({ ...this.data, products });
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
