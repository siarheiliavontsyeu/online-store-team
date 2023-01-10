import { ComponentOptions } from '../../constants/types';
import Store from '../store/store.core';
import Listener from './listeners.core';
import { DomNode } from './node.core';
import Observer from './observer.core';

export default class Component extends Listener {
  private unSubscribers: Array<() => void>;
  public name: string;
  protected observer: Observer;
  protected store: Store;

  constructor(public $root: DomNode, options: ComponentOptions) {
    super($root, options.listeners);
    this.name = options.name;
    this.observer = options.observer;
    this.store = options.store;
    this.unSubscribers = [];
  }

  init() {
    super.initListeners();
  }

  emit(eventName: string, ...args: Array<unknown>) {
    this.observer.emit(eventName, ...args);
  }

  subscribe(eventName: string, fn: () => void) {
    const unSub = this.observer.subscribe(eventName, fn);
    this.unSubscribers.push(unSub);
  }

  destroy() {
    super.removeListeners();
    this.unSubscribers.forEach((unSub) => unSub());
  }

  update() {
    this.destroy();
    this.$root.html(this.render() as string);
    this.init();
  }

  render(): DomNode | string {
    return '';
  }
}
