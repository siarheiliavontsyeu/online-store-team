export class CurrentRoute {
  static get path() {
    return window.location.hash.slice(1);
  }

  static get param() {
    return CurrentRoute.path.split('/')[1];
  }

  static navigate(path: string) {
    window.location.hash = path;
  }
}
