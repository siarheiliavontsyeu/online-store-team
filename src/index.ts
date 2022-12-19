import './plugins/bootstrap';
import './plugins/fontawesome';
import { Router } from './pages/router';
import Store from './core/store/store.core';
import Api from './api/Api';

import { filterProducts, getCategories, getData } from './api/dataManipulation';

const store = new Store({
  test: 'test',
});
new Router('body', store);

console.log('App started!');

const api = new Api();

async function app() {
  const products = await api.getProducts();
  console.log(products);
  const categories = getCategories(products.products); //await api.getCategories();
  console.log(categories);
  getData(products.products);
  let filteredProducts = filterProducts({ products: products.products, text: 'mic' });
  console.log(filteredProducts);
  getData(filteredProducts);
  filteredProducts = filterProducts({ products: products.products, brand: 'Apple' });
  console.log(filteredProducts);
  getData(filteredProducts);
}

app();
