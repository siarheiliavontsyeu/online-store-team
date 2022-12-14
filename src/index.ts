import { Router } from './core/router/router';
import { Cart } from './pages/Cart';
import { MainPage } from './pages/MainPage';
import { NotFound } from './pages/NotFound';
import { Product } from './pages/Product';

enum Pages {
  'main' = 'main',
  'product' = 'product',
  'cart' = 'cart',
  'notFound' = 'notFound',
}

new Router('body', {
  [Pages.main]: MainPage,
  [Pages.product]: Product,
  [Pages.cart]: Cart,
  [Pages.notFound]: NotFound,
});

console.log('App started!');
