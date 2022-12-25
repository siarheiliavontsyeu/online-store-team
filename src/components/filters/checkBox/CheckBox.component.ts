import { Actions } from '../../../constants/actions';
import { FilterDataI, ComponentOptionsFilter, Groups } from '../../../constants/types';
import Component from '../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../core/components/node.core';
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

      if (this.data.group === Groups.Category) {
        this.store.setCheckedCategories(allCheckedIds);
      }
      if (this.data.group === Groups.Brand) {
        this.store.setCheckedBrands(allCheckedIds);
      }
      this.store.setMinMaxStock(this.store.state.initialStocks);
      this.store.setMinMaxPrices(this.store.state.initialPrices);
      this.emit(Actions.PRODUCTS_FILTER);
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
