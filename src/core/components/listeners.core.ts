import { getMethodName } from '../../utils/helpers.utils';
import { DomNode } from './node.core';

export default class Listener {
  [key: string]: unknown;

  constructor(public $root: DomNode, public listeners: Array<keyof GlobalEventHandlersEventMap> = []) {}

  initListeners() {
    this.listeners.forEach((listener) => {
      const method: string = getMethodName(listener);
      this[method] = (this[method] as () => void).bind(this);
      this.$root.on(listener, this[method] as () => void);
    });
  }

  removeListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method] as () => void);
    });
  }
}
