import { MainPageContainer } from '../components/main-page/MainPageContainer';
import { PageNames } from '../constants/types';
import { DomNode } from '../core/components/node.core';
import { CurrentRoute } from '../core/router/currentRoute';
import { Page } from '../core/router/page';
import Store from '../core/store/store.core';

export class Main extends Page {
  private mainPageContainer: MainPageContainer | null;

  constructor(public store: Store) {
    super(store);
    this.mainPageContainer = null;
  }

  render(): DomNode {
    // if (CurrentRoute.path === '') {
    //   CurrentRoute.navigate(PageNames.main);
    // }
    console.log(this.store.state);
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
