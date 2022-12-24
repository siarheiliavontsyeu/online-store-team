import { Actions } from '../../../constants/actions';
import { FilterDataI, ComponentOptionsFilter, Groups } from '../../../constants/types';
import Component from '../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../core/components/node.core';
import { getTemplate } from './range.template';

export default class Range extends Component {
  static tagName = 'div';
  static className = 'range-filter';

  private data: FilterDataI;
  private $miniSlide: false | DomNode;
  private $maxiSlide: false | DomNode;
  private $priceMini: false | DomNode;
  private $priceMaxi: false | DomNode;

  constructor($root: DomNode, options: ComponentOptionsFilter) {
    super($root, {
      ...options,
      name: 'Range',
      listeners: ['change'],
    });
    this.data = options.data;
    this.$miniSlide = false;
    this.$maxiSlide = false;
    this.$priceMini = false;
    this.$priceMaxi = false;
  }

  init() {
    super.init();
    this.$miniSlide = this.$root.find('#miniSlide');
    this.$maxiSlide = this.$root.find('#maxiSlide');
    this.$priceMini = this.$root.find('#price-mini');
    this.$priceMaxi = this.$root.find('#price-maxi');
  }

  onChange(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    if ($target.hasClass('multi-range__slide')) {
      if (this.$miniSlide && this.$maxiSlide && this.$priceMini && this.$priceMaxi) {
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
        this.$priceMini.text(String(miniVal));
        this.$priceMaxi.text(String(maxiVal));
        if (this.data.group === Groups.Price) {
          this.store.setMinMaxPrices([miniVal, maxiVal]);
          this.store.filterProducts({
            price: this.store.getMinMaxPrices() as [number, number],
            stock: this.store.getMinMaxStock() as [number, number],
            category: this.store.getCheckedCategories(),
            brand: this.store.getCheckedBrands(),
          });
        }
        if (this.data.group === Groups.Stock) {
          this.store.setMinMaxStock([miniVal, maxiVal]);
          this.store.filterProducts({
            price: this.store.getMinMaxPrices() as [number, number],
            stock: this.store.getMinMaxStock() as [number, number],
            category: this.store.getCheckedCategories(),
            brand: this.store.getCheckedBrands(),
          });
        }
        console.log([miniVal, maxiVal]);
        console.log(this.store.state.prices, this.store.state.stocks);
        console.log(this.store.state.products);
        this.emit(Actions.PRODUCTS_FILTER);
      }
    }
  }

  render() {
    return getTemplate(this.data);
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
