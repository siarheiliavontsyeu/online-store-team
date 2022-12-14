import { Router } from './core/router/router';
import { Cart } from './pages/Cart';
import { MainPage } from './pages/MainPage';
import { NotFound } from './pages/NotFound';
import { Product } from './pages/Product';

new Router('body', {
  main: MainPage,
  product: Product,
  cart: Cart,
  notFound: NotFound,
});

console.log('App started!');
