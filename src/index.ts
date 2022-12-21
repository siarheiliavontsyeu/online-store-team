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
    store.initProductsState(products);
    // console.log(getCategoriesList(store, true));
    // console.log(getBrandsList(store, true));
    // console.log(store.state);
    // store.filterProducts({ text: 'm' });

    // console.log(getCategoriesList(store));
    // console.log(getBrandsList(store));
    // store.addToCart(1);
    // store.addToCart(2);
    // store.addToCart(3);
    // store.addToCart(1);
    // store.addToCart(1);
    // store.addToCart(6);
    // store.dropFromCart(3);
    // store.dropFromCart(1);
    // console.log(store.getProductsFoundCount());
    // console.log(store.getSummary());
    console.log(store.state);
    // console.log(store.getProductsForView());
    // console.log('//----------------------//');
    // store.sortingProducts({ sortBy: 'price', asc: true });
    // console.log(store.state.products);
    // console.log('//----------------------//');
    // store.sortingProducts({ sortBy: 'price', asc: false });
    // console.log(store.state.products);
    new Router('body', store);
  } catch (e) {
    console.error((e as Error).message);
  }

  console.log('App started!');
}

void app();
