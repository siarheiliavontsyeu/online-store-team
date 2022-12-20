import {
  getBrandsWithCount,
  getCategoriesWithCount,
  getMinMaxPrices,
  getMinMaxStock,
} from '../../api/dataManipulation';
import { ProductI, StateI } from '../../constants/types';

export default class Store {
  public state: StateI;

  constructor() {
    this.state = {
      initialProducts: [],
      initialCategories: {},
      initialBrands: {},
      products: [],
      categories: {},
      brands: {},
      prices: [],
      stocks: [],
    };
  }

  initProductsState(products: ProductI[]) {
    this.state.initialProducts = products;
    this.state.initialCategories = getCategoriesWithCount(products);
    this.state.initialBrands = getBrandsWithCount(products);
    this.state.prices = getMinMaxPrices(products);
    this.state.stocks = getMinMaxStock(products);
  }

  updateProductsState(products: ProductI[]) {
    this.state.products = products;
    this.state.categories = getCategoriesWithCount(products);
    this.state.brands = getBrandsWithCount(products);
    this.state.prices = getMinMaxPrices(products);
    this.state.stocks = getMinMaxStock(products);
  }
}
