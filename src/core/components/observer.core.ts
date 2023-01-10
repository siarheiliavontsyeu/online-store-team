interface ListenerI {
  [index: string]: Array<(...args: Array<unknown>) => void>;
}

export default class Observer {
  private listeners: ListenerI;
  constructor() {
    this.listeners = {};
  }

  emit(event: string, ...args: Array<unknown>): boolean {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  subscribe(event: string, fn: () => void) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => listener !== fn);
    };
  }
}
