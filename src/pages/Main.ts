import { MainPage } from '../components/main-page/MainPage';
import { DomNode } from '../core/components/node.core';
import { Page } from '../core/router/page';

export class Main extends Page {
  private mainPage: MainPage | null;

  constructor() {
    super();
    this.mainPage = null;
  }

  render(): DomNode {
    this.mainPage = new MainPage();
    return this.mainPage.render();
  }

  afterRender() {
    this.mainPage?.init();
  }

  destroy() {
    this.mainPage?.destroy();
  }
}
