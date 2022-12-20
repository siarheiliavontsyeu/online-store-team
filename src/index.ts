import './plugins/bootstrap';
import './plugins/fontawesome';
import { Router } from './pages/router';
import Store from './core/store/store.core';
import Api from './api/Api';

async function app() {
  const store = new Store();
  new Router('body', store);
  const api = new Api();

  const products = await api.getProducts();
  store.initProductsState(products.products);
  // console.log(getCategoriesList(store, true));
  // console.log(getBrandsList(store, true));
  console.log(store.state);
  store.filterProducts({ text: 'mi' });

  // console.log(getCategoriesList(store));
  // console.log(getBrandsList(store));
  store.addToCart(1);
  store.addToCart(2);
  store.addToCart(3);
  store.addToCart(1);
  store.addToCart(1);
  store.addToCart(6);
  store.dropFromCart(3);
  // store.dropFromCart(1);
  console.log(store.getProductsFoundCount());
  console.log(store.getSummary());
  console.log(store.state);
  console.log(store.getProductsForView());
  console.log('//----------------------//');
  store.sortingProducts({ sortBy: 'discountPercentage', asc: true });
  console.log(store.state.products);
  console.log('//----------------------//');
  // store.sortingProducts({ sortBy: 'price', asc: false });
  // console.log(store.state.products);
  console.log('App started!');
}

void app();
