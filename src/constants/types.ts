import Observer from '../core/components/observer.core';
import Store from '../core/store/store.core';
import { Cart } from '../pages/Cart';
import { Main } from '../pages/Main';
import { NotFound } from '../pages/NotFound';
import { Product } from '../pages/Product';

export interface ComponentOptions {
  name: string;
  listeners: Array<keyof GlobalEventHandlersEventMap>;
  observer: Observer;
  store: Store;
}

export interface ComponentOptionsFilter extends ComponentOptions {
  data: FilterDataI;
}

export interface ProductI {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  isInCart?: boolean;
}

export interface ProductsResponseI {
  products: ProductI[];
  total: number;
  skip: number;
  limit: number;
}

export interface StateI {
  initialProducts: ProductI[];
  initialCategories: { [key: string]: number };
  initialBrands: { [key: string]: number };
  initialPrices: number[];
  initialStocks: number[];
  products: ProductI[];
  categories: { [key: string]: number };
  brands: { [key: string]: number };
  prices: number[];
  stocks: number[];
  cart: CartI[];
  checkedCategories: string[];
  checkedBrands: string[];
  categoriesScrollPosition: number;
  brandsScrollPosition: number;
  productsSortBy: ProductsSortBy;
  searchText: string;
  filterBy: FilterBy;
  urlQuery: string;
  urlParams: string;
}

export enum FilterBy {
  checkbox = 'checkbox',
  range = 'range',
  text = 'text',
  null = '',
}

export type ProductsSortBy =
  | 'price-ASC'
  | 'price-DESC'
  | 'rating-ASC'
  | 'rating-DESC'
  | 'discount-ASC'
  | 'discount-DESC';

export interface CartI {
  id: number;
  count: number;
  stock: number;
}

export interface FilterProductsI {
  category?: string[];
  brand?: string[];
  price?: [number, number];
  stock?: [number, number];
  text?: string;
}

export interface FilterDataI {
  group: string;
  initData: { [key: string]: number } | number[];
  currentData: { [key: string]: number } | number[];
  checked?: string[];
  products?: ProductI[];
}

export type CategoriesT = string[];

export const enum SortingOptions {
  Price = 'price',
  Rating = 'rating',
  Discount = 'discount',
}

export const enum Groups {
  Category = 'Category',
  Brand = 'Brand',
  Price = 'Price',
  Stock = 'Stock',
}

export const enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum PageNames {
  product = 'product',
  main = 'main',
  cart = 'cart',
  notFound = '404',
}

export interface Pages {
  main: typeof Main;
  product: typeof Product;
  cart: typeof Cart;
  notFound: typeof NotFound;
}

export type PagesClasses = typeof Main | typeof Product | typeof Cart | typeof NotFound;

export interface SummaryI {
  products: number;
  total: number;
}