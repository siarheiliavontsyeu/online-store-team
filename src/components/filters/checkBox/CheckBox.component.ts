import { FilterDataI, ComponentOptionsFilter, Groups } from '../../../constants/types';
import Component from '../../../core/components/component.core';
import { DomNode, wrapperNode } from '../../../core/components/node.core';
import { getTemplate } from './checkBox.template';

export default class CheckBox extends Component {
  static tagName = 'div';
  static className = 'checkbox-filter';

  private data: FilterDataI;

  constructor($root: DomNode, options: ComponentOptionsFilter) {
    super($root, {
      ...options,
      name: 'CheckBox',
      listeners: ['click'],
    });
    this.data = options.data;
  }

  init() {
    super.init();
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
