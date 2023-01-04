import { FilterDataI, ComponentOptionsFilter, Groups, FilterBy, PageNames } from '../../../../constants/types';
import { SEPARATOR } from '../../../../constants/data';
import Component from '../../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../../core/components/node.core';
import { CurrentRoute } from '../../../../core/router/currentRoute';
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

        if (this.data.group === Groups.Price) {
          this.store.setMinMaxPrices([miniVal, maxiVal]);
          if (isFinite(this.store.getMinMaxStock()[0])) {
            stock = `${stock}${this.store.getMinMaxStock().join(SEPARATOR)}`;
            path = `${path}&${stock}`;
          }

          price = `${price}${this.store.getMinMaxPrices().join(SEPARATOR)}`;
          path = `${path}&${price}`;
        }

        if (this.data.group === Groups.Stock) {
          this.store.setMinMaxStock([miniVal, maxiVal]);
          if (isFinite(this.store.getMinMaxPrices()[0])) {
            price = `${price}${this.store.getMinMaxPrices().join(SEPARATOR)}`;
            path = `${path}&${price}`;
          }
          stock = `${stock}${this.store.getMinMaxStock().join(SEPARATOR)}`;
          path = `${path}&${stock}`;
        }

        this.store.setFilterBy(FilterBy.range);

        CurrentRoute.navigate(path);
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
