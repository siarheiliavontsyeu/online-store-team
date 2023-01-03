import { MainPageContainer } from '../components/main-page/MainPageContainer';
import { PageNames } from '../constants/types';
import { DomNode } from '../core/components/node.core';
import { CurrentRoute } from '../core/router/currentRoute';
import { Page } from '../core/router/page';
import Store from '../core/store/store.core';

export class Main extends Page {
  private mainPageContainer: MainPageContainer | null;

  constructor(public store: Store, public params: string, public query: string) {
    super(store, params, query);
    this.mainPageContainer = null;
  }

  render(): DomNode {
    const queryArr: string[] = this.query.split('&');
    this.mainPageContainer = new MainPageContainer(this.store, this.params, queryArr);
    return this.mainPageContainer.render();
  }

  afterRender() {
    this.mainPageContainer?.init();
  }

  destroy() {
    this.mainPageContainer?.destroy();
  }
}
