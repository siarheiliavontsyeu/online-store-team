import { PageNames } from '../../constants/types';

export class CurrentRoute {
  static get path() {
    return window.location.hash.slice(1);
  }

  static get pageName() {
    if (CurrentRoute.path) {
      return CurrentRoute.path.split('/')[0];
    }
    return PageNames.main;
  }

  static get param() {
    if (CurrentRoute.path) {
      return CurrentRoute.path.split('/')[1]?.split('?')[0];
    }
    return '';
  }

  static get query() {
    if (CurrentRoute.path) {
      return CurrentRoute.path.split('?')[1];
    }
    return '';
  }

  static navigate(path: string) {
    window.location.hash = path;
  }
}
