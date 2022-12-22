import { FilterDataI, ComponentOptionsFilter } from '../../../constants/types';
import Component from '../../../core/components/component.core';
import { DomNode } from '../../../core/components/node.core';
import { getTemplate } from './range.template';

export default class Range extends Component {
  static tagName = 'div';
  static className = 'range-filter';

  private data: FilterDataI;

  constructor($root: DomNode, options: ComponentOptionsFilter) {
    super($root, {
      ...options,
      name: 'Range',
      listeners: [],
    });
    this.data = options.data;
  }

  init() {
    super.init();
  }

  render() {
    return getTemplate(this.data);
  }

  destroy() {
    super.destroy();
    this.$root.clear();
  }
}
