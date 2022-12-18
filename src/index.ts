import './plugins/bootstrap';
import './plugins/fontawesome';
import { Router } from './pages/router';
import Store from './core/store/store.core';

const store = new Store({
  test: 'test',
});
new Router('body', store);

console.log('App started!');
