import './plugins/bootstrap';
import './plugins/fontawesome';
import { Router } from './pages/router';
import Store from './core/store/store.core';
import Api from './api/Api';

import { filterProducts } from './api/dataManipulation';

async function app() {
  const store = new Store();
  new Router('body', store);
  const api = new Api();

  const products = await api.getProducts();
  store.initProductsState(products.products);
  console.log(store.state);
  const filteredProducts = filterProducts({ products: products.products, text: 'mic' });
  store.updateProductsState(filteredProducts);
  console.log(store.state);
  console.log('App started!');
}

void app();
