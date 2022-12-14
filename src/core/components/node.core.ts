export class DomNode extends HTMLElement {
  public $el: HTMLElement;
  constructor(public selector: string | HTMLElement) {
    super();
    if (typeof selector === 'string') {
      this.$el = document.querySelector(selector)!;
    } else {
      this.$el = selector;
    }
  }

  html(html?: string) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.innerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType: keyof GlobalEventHandlersEventMap, fn: () => void) {
    this.$el.addEventListener(eventType, fn);
  }

  off(eventType: keyof GlobalEventHandlersEventMap, fn: () => void) {
    this.$el.removeEventListener(eventType, fn);
  }

  append(node: Node | DomNode) {
    if (node instanceof DomNode) {
      node = node.$el;
    }
    this.$el.append(node);
    return this;
  }

  attr(name: string, value?: string) {
    if (value === undefined) {
      this.$el.removeAttribute(name);
      return this;
    }
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }

  inlineCss(styles: { [key: string]: string } = {}) {
    Object.keys(styles).forEach((key) => {
      if (this.$el) {
        this.$el.style[key as unknown as number] = styles[key];
      }
    });
  }

  data(name?: string) {
    if (name) {
      return this.$el.dataset[name];
    }
    return null;
  }

  text(text?: string) {
    if (typeof text !== 'undefined') {
      if (['input', 'select'].includes(this.$el.tagName.toLowerCase())) {
        (this.$el as unknown as HTMLInputElement | HTMLSelectElement).value = text;
      } else {
        this.$el.textContent = text;
      }
      return this;
    }
    if (['input', 'select'].includes(this.$el.tagName.toLowerCase())) {
      return (this.$el as unknown as HTMLInputElement | HTMLSelectElement).value.trim();
    }

    return this.$el.textContent!.trim();
  }

  find(selector: string) {
    const element = this.$el.querySelector(selector) as HTMLElement;
    if (element) {
      return wrapperNode(element);
    }
    return false;
  }
  addClass(className: string) {
    this.$el?.classList.add(className);
    return this;
  }

  replaceClass(old: string, newish: string) {
    this.$el?.classList.replace(old, newish);
    return this;
  }

  removeClass(className: string) {
    this.$el?.classList.remove(className);
    return this;
  }

  hasClass(className: string) {
    return this.$el?.classList.contains(className);
  }

  hide() {
    this.addClass('d-none');
  }

  show() {
    this.removeClass('d-none');
  }
}

export const wrapperNode = (selector: HTMLElement | string) => new DomNode(selector);

export const createNode = ({
  tag,
  classes,
  innerText,
}: {
  tag: keyof HTMLElementTagNameMap;
  classes?: string[];
  innerText?: string;
}) => {
  const el = document.createElement(tag) as HTMLElement;
  if (classes) {
    classes.forEach((className) => el.classList.add(className));
  }
  if (innerText) {
    el.innerText = innerText;
  }
  return wrapperNode(el);
};
