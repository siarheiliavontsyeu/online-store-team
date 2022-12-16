import { MainPage } from '../components/main-page/MainPage';
import { DomNode } from '../core/components/node.core';
import { Page } from '../core/router/page';
import Store from '../core/store/store.core';

export class Main extends Page {
  private mainPage: MainPage | null;

  constructor(public store: Store, public params?: unknown) {
    super(store, params);
    this.mainPage = null;
  }

  render(): DomNode {
    this.mainPage = new MainPage(this.store);
    return this.mainPage.render();
  }

  afterRender() {
    this.mainPage?.init();
  }

  destroy() {
    this.mainPage?.destroy();
  }
}
