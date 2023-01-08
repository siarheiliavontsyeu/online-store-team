import { NotFoundPageContainer } from '../components/not-found-page/NotFoundContainer';
import { DomNode } from '../core/components/node.core';
import { Page } from '../core/router/page';
import Store from '../core/store/store.core';

export class NotFound extends Page {
  private notFoundPageContainer: NotFoundPageContainer | null;

  constructor(public store: Store) {
    super(store,);
    this.notFoundPageContainer = null;
  }
  render(): DomNode {
    this.notFoundPageContainer = new NotFoundPageContainer(this.store);
    return this.notFoundPageContainer.render();
  }
}
