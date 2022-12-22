import Component from '../../core/components/component.core';
import { createNode, DomNode } from '../../core/components/node.core';
import { getTemplate } from './filters.template';
import { FilterDataI, ComponentOptions, Groups } from '../../constants/types';
import CheckBox from './checkBox/index';
import Range from './range/index';

type ComponentsClasses = typeof CheckBox | typeof Range;
type ComponentsInstances = CheckBox | Range;

const enum ComponentsOrder {
  CheckBox0,
  CheckBox1,
  Range0,
  Range1,
}

export default class Filters extends Component {
  static tagName = 'div';
  static className = 'filters';
  private $checkBoxAppendPoint: DomNode | false;
  private $rangeAppendPoint: DomNode | false;
  componentsClass: ComponentsClasses[];
  componentsInstance: ComponentsInstances[];

  constructor($root: DomNode, options: ComponentOptions) {
    super($root, {
      ...options,
      name: 'Filters',
      listeners: [],
    });
    this.$checkBoxAppendPoint = false;
    this.$rangeAppendPoint = false;
    this.componentsClass = [CheckBox, CheckBox, Range, Range];
    this.componentsInstance = [];
  }

  init() {
    super.init();
    this.$checkBoxAppendPoint = this.$root.find('.filters__checkbox');
    this.$rangeAppendPoint = this.$root.find('.filters__range');
    this.renderComponents();
    this.subscribe('CheckBox:filter', () => {
      this.update();
      console.log(this.store.state);
    });
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
      let data = {} as FilterDataI;
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
      if (idx === ComponentsOrder.Range0) {
        data = {
          group: Groups.Price,
          currentData: this.store.state.prices,
        };
      }
      if (idx === ComponentsOrder.Range1) {
        data = {
          group: Groups.Stock,
          currentData: this.store.state.stocks,
        };
      }
      const component = new Comp($el, { ...componentOptions, name: '', listeners: [], data });
      $el.html(component.render());
      if ([ComponentsOrder.CheckBox0, ComponentsOrder.CheckBox1].includes(idx)) {
        if (this.$checkBoxAppendPoint) {
          this.$checkBoxAppendPoint.append($el);
        }
      }
      if ([ComponentsOrder.Range0, ComponentsOrder.Range1].includes(idx)) {
        if (this.$rangeAppendPoint) {
          this.$rangeAppendPoint.append($el);
        }
      }
      this.componentsInstance.push(component);
    });
    this.componentsInstance.forEach((component) => component.init());
  }

  render() {
    return getTemplate();
  }

  destroy() {
    super.destroy();
    if (this.$checkBoxAppendPoint && this.$rangeAppendPoint) {
      this.$checkBoxAppendPoint.clear();
      this.$checkBoxAppendPoint.clear();
    }
    this.componentsInstance.forEach((component) => {
      component.destroy();
    });
  }
}
