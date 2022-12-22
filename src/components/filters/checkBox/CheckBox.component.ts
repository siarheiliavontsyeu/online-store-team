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
  }

  init() {
    super.init();
    this.$scrollableBody = this.$root.find('.pre-scrollable');
    if (this.$scrollableBody) {
      if (this.data.group === Groups.Category) {
        this.$scrollableBody.$el.scrollTop = this.store.getCategoriesScroll();
      }
      if (this.data.group === Groups.Brand) {
        this.$scrollableBody.$el.scrollTop = this.store.getBrandsScroll();
      }
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
        this.$scrollableBody && this.store.setCategoriesScroll(this.$scrollableBody.$el.scrollTop);
      }
      if (this.data.group === Groups.Brand) {
        this.store.setCheckedBrands(allCheckedIds);
        this.$scrollableBody && this.store.setBrandsScroll(this.$scrollableBody.$el.scrollTop);
      }
      this.store.filterProducts({ category: this.store.getCheckedCategories(), brand: this.store.getCheckedBrands() });
      this.emit(this.name + ':filter');
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
    this.$root.clear();
  }
}
