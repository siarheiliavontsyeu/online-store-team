import { MainPageContainer } from '../components/main-page/MainPageContainer';
import { DomNode } from '../core/components/node.core';
import { Page } from '../core/router/page';
import Store from '../core/store/store.core';

export class Main extends Page {
  private mainPageContainer: MainPageContainer | null;

  constructor(public store: Store, public params?: unknown) {
    super(store, params);
    this.mainPageContainer = null;
  }

  render(): DomNode {
    this.mainPageContainer = new MainPageContainer(this.store);
    return this.mainPageContainer.render();
  }

  afterRender() {
    this.mainPageContainer?.init();
  }

  destroy() {
    this.mainPageContainer?.destroy();
  }
}
