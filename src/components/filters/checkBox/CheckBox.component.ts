import { CheckBoxFilterI, ComponentOptionsFilter } from '../../../constants/types';
import Component from '../../../core/components/component.core';
import { DomNode } from '../../../core/components/node.core';
import { getTemplate } from './checkBox.template';

export default class CheckBox extends Component {
  static tagName = 'div';
  static className = 'checkbox-filter';

  private data: CheckBoxFilterI;

  constructor($root: DomNode, options: ComponentOptionsFilter) {
    super($root, {
      ...options,
      name: 'CheckBox',
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
