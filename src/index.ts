import './plugins/bootstrap';
import './plugins/fontawesome';
import { Router } from './pages/router';
import Store from './core/store/store.core';
import Api from './api/Api';

async function app() {
  const store = new Store();
  const api = new Api();

  try {
    const productsResponse = await api.getProducts();
    const products = productsResponse?.products || [];
    store.sortingProducts(products, true);
    store.addToCart(1);
    store.addToCart(5);
    store.addToCart(11);
    store.addToCart(15);
    new Router('body', store);
  } catch (e) {
    console.error((e as Error).message);
    console.error((e as Error).stack);
  }

  console.log('App started!');
}

void app();
