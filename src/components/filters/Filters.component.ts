import Component from '../../core/components/component.core';
import { createNode, DomNode } from '../../core/components/node.core';
import { getTemplate } from './filters.template';
import { CheckBoxFilterI, ComponentOptions, Groups } from '../../constants/types';
import CheckBox from './checkBox/index';

type ComponentsClasses = typeof CheckBox;
type ComponentsInstances = CheckBox;

const enum ComponentsOrder {
  CheckBox0,
  CheckBox1,
  Range0,
  Range1,
}

export default class Filters extends Component {
  static tagName = 'div';
  static className = 'filters';
  private checkBoxAppendPoint: DomNode | false;
  private rangeAppendPoint: DomNode | false;
  componentsClass: ComponentsClasses[];
  componentsInstance: ComponentsInstances[];

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'Filters',
      listeners: [],
    });
    this.checkBoxAppendPoint = false;
    this.rangeAppendPoint = false;
    this.componentsClass = [CheckBox, CheckBox];
    this.componentsInstance = [];
  }

  init() {
    super.init();
    this.checkBoxAppendPoint = this.$root.find('.filters__checkbox');
    this.rangeAppendPoint = this.$root.find('.filters__range');
    this.renderComponents();
  }

  renderComponents() {
    const componentOptions = {
      observer: this.observer,
      store: this.store,
    };

    this.componentsClass.forEach((Comp: ComponentsClasses, idx) => {
      const className = Comp.className;
      const tagName = (Comp.tagName as keyof HTMLElementTagNameMap) ?? 'div';
      const classes = [className];
      const $el = createNode({ tag: tagName, classes });
      let data = {} as CheckBoxFilterI;
      if (idx === ComponentsOrder.CheckBox0) {
        data = {
          group: Groups.Category,
          initData: this.store.state.initialCategories,
          currentData: this.store.state.categories,
        };
      }
      if (idx === ComponentsOrder.CheckBox1) {
        data = {
          group: Groups.Brand,
          initData: this.store.state.initialBrands,
          currentData: this.store.state.brands,
        };
      }
      const component = new Comp($el, { ...componentOptions, name: '', listeners: [], data });
      $el.html(component.render());
      if ([ComponentsOrder.CheckBox0, ComponentsOrder.CheckBox1].includes(idx)) {
        if (this.checkBoxAppendPoint) {
          this.checkBoxAppendPoint.append($el);
        }
      }
      if ([ComponentsOrder.Range0, ComponentsOrder.Range1].includes(idx)) {
        if (this.rangeAppendPoint) {
          this.rangeAppendPoint.append($el);
        }
      }
      this.componentsInstance.push(component);
    });
    if (this.checkBoxAppendPoint && this.rangeAppendPoint) {
      this.$root.append(this.checkBoxAppendPoint);
      this.$root.append(this.rangeAppendPoint);
    }
    this.componentsInstance.forEach((component) => component.init());
  }

  render() {
    return getTemplate();
  }

  destroy() {
    super.destroy();
    this.$root.clear();
    this.componentsInstance.forEach((component) => {
      component.destroy();
    });
  }
}
