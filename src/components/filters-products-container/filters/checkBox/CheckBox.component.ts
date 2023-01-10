import { SEPARATOR } from '../../../../constants/data';
import { FilterDataI, ComponentOptionsFilter, Groups, PageNames, FilterBy } from '../../../../constants/types';
import Component from '../../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../../core/components/node.core';
import { CurrentRoute } from '../../../../core/router/currentRoute';
import { getTemplate } from './checkBox.template';

export default class CheckBox extends Component {
  static tagName = 'div';
  static className = 'checkbox-filter';

  private data: FilterDataI;
  private $scrollableBody: DomNode | false;

  constructor($root: DomNode, options: ComponentOptionsFilter) {
    super($root, {
      ...options,
      name: 'CheckBox',
      listeners: ['click'],
    });
    this.data = options.data;
    this.$scrollableBody = false;
    this.handleScroll = this.handleScroll.bind(this);
  }

  init() {
    super.init();
    this.$scrollableBody = this.$root.find('.pre-scrollable');
    if (this.$scrollableBody) {
      if (this.data.group === Groups.Category) {
        this.$scrollableBody.$el.scrollTop = this.store.getCategoriesScrollPosition();
      }
      if (this.data.group === Groups.Brand) {
        this.$scrollableBody.$el.scrollTop = this.store.getBrandsScrollPosition();
      }
    }
    this.$scrollableBody && this.$scrollableBody.on('scroll', this.handleScroll);
  }

  private handleScroll() {
    if (this.data.group === Groups.Category) {
      this.$scrollableBody && this.store.setCategoriesScrollPosition(this.$scrollableBody.$el.scrollTop);
    }
    if (this.data.group === Groups.Brand) {
      this.$scrollableBody && this.store.setBrandsScrollPosition(this.$scrollableBody.$el.scrollTop);
    }
  }

  onClick(e: Event) {
    const $target = wrapperNode(e.target as HTMLElement);
    const isCheckbox = $target.hasClass('form-check-input');

    if (isCheckbox) {
      const allCheckedCheckboxes = this.$root.findAll('.form-check-input:checked');

      let allCheckedIds: string[] = [];
      if (allCheckedCheckboxes) {
        allCheckedIds = allCheckedCheckboxes.map((elem) => {
          return elem.attr('id');
        }) as string[];
      }

      this.store.setMinMaxPrices([-Infinity, Infinity]);
      this.store.setMinMaxStock([-Infinity, Infinity]);
      this.store.setFilterBy(FilterBy.checkbox);

      let path = `${PageNames.main}/?`;
      let category = 'category=';
      let brand = 'brand=';
      let stock = 'stock=';
      let price = 'price=';
      let search = 'search=';
      let sort = 'sort=';
      let view = 'view=';

      if (isFinite(this.store.getMinMaxPrices()[0])) {
        price = `${price}${this.store.getMinMaxPrices().join(SEPARATOR)}`;
        path = `${path}${price}`;
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

      if (this.store.getProductsViewBy()) {
        view = `${view}${this.store.getProductsViewBy()}`;
        path = `${path}&${view}`;
      }

      if (this.data.group === Groups.Category) {
        this.store.setCheckedCategories(allCheckedIds);
        if (this.store.getCheckedBrands().length) {
          brand = `${brand}${this.store.getCheckedBrands().join(SEPARATOR)}`;
          path = `${path}&${brand}`;
        }
        category = `${category}${this.store.getCheckedCategories().join(SEPARATOR)}`;
        path = `${path}&${category !== 'category=' ? category : ''}`;
      }
      if (this.data.group === Groups.Brand) {
        this.store.setCheckedBrands(allCheckedIds);
        if (this.store.getCheckedCategories().length) {
          category = `${category}${this.store.getCheckedCategories().join(SEPARATOR)}`;
          path = `${path}&${category}`;
        }
        brand = `${brand}${this.store.getCheckedBrands().join(SEPARATOR)}`;
        path = `${path}&${brand !== 'brand=' ? brand : ''}`;
      }

      CurrentRoute.navigate(path);
    }
  }

  render() {
    let checked: string[] = [];
    if (this.data.group === Groups.Category) {
      checked = this.store.getCheckedCategories();
    }
    if (this.data.group === Groups.Brand) {
      checked = this.store.getCheckedBrands();
    }
    return getTemplate({ ...this.data, checked });
  }

  destroy() {
    super.destroy();
    this.$scrollableBody && this.$scrollableBody.off('scroll', this.handleScroll);
    this.$root.clear();
  }
}
