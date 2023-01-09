import {
  CartI,
  FilterBy,
  Order,
  ProductI,
  ProductsSortBy,
  SortingOptions,
  StateI,
  StorageE,
  SummaryI,
  ViewOptions,
} from '../../constants/types';
import { SEPARATOR } from '../../constants/data';
import { storage } from '../../utils/helpers.utils';

export default class Store {
  public state: StateI;

  constructor() {
    this.state = {
      initialProducts: [],
      initialCategories: {},
      initialBrands: {},
      initialPrices: [],
      initialStocks: [],
      products: [],
      categories: {},
      brands: {},
      prices: [],
      stocks: [],
      cart: [],
      checkedCategories: [],
      checkedBrands: [],
      categoriesScrollPosition: 0,
      brandsScrollPosition: 0,
      productsSortBy: 'price-DESC',
      productsViewBy: 'Big-cards',
      searchText: '',
      filterBy: FilterBy.null,
      urlQuery: '',
      urlParams: '',
      initialPromoCodes: [
        { text: 'ALI', discount: 15 },
        { text: 'SIA', discount: 5 },
      ],
      promoCodes: [],
    };
  }

  initProductsState(products: ProductI[]) {
    this.state.initialProducts = products;
    this.state.initialCategories = this.getCategoriesWithCount(products);
    this.state.initialBrands = this.getBrandsWithCount(products);
    this.state.initialPrices = this.getMinMaxPrices(products);
    this.state.initialStocks = this.getMinMaxStock(products);
    this.state.products = products;
    this.state.categories = this.getCategoriesWithCount(products);
    this.state.brands = this.getBrandsWithCount(products);
    this.state.prices = this.getMinMaxPrices(products);
    this.state.stocks = this.getMinMaxStock(products);
    const cart = storage<CartI[]>(StorageE.SHOP_CART);
    this.state.cart = cart ? (cart as CartI[]) : [];
  }

  updateProductsState(products: ProductI[]) {
    this.state.products = products;
    this.state.categories = this.getCategoriesWithCount(products);
    this.state.brands = this.getBrandsWithCount(products);
    this.state.prices = this.getFilterBy() === FilterBy.range ? this.getMinMaxPrices() : this.getMinMaxPrices(products);
    this.state.stocks = this.getFilterBy() === FilterBy.range ? this.getMinMaxStock() : this.getMinMaxStock(products);
  }

  getInitialPromoCodes() {
    return this.state.initialPromoCodes;
  }

  getPromoCodes() {
    return this.state.promoCodes;
  }

  pickPromoCode(value: string) {
    const code = this.state.initialPromoCodes.find((el) => el.text === value.toUpperCase());
    const codeInPromoCodes = this.state.promoCodes.some((promo) => promo.text === value.toUpperCase());
    if (code && !codeInPromoCodes) {
      this.state.promoCodes = [...this.state.promoCodes, code];
      return code;
    }
    return false;
  }

  dropPromoCode(value: string) {
    this.state.promoCodes = this.state.promoCodes.filter((el) => el.text !== value.toUpperCase());
  }

  getFilterBy() {
    return this.state.filterBy;
  }

  setFilterBy(value: FilterBy) {
    this.state.filterBy = value;
  }

  updateProductsStateFromUrl() {
    if (this.getUrlQuery()) {
      const urlQuery = decodeURIComponent(this.getUrlQuery())?.split('&');
      const queries: { [key: string]: string[] } = {};
      urlQuery.forEach((el) => {
        const [type = '', query = ''] = el.split('=');
        queries[type] = query.split(SEPARATOR);
      });

      this.state.checkedBrands = queries.brand ? queries.brand : [];
      this.state.checkedCategories = queries.category ? queries.category : [];
      this.state.prices = queries.price && queries.price.length ? queries.price.map((el) => parseInt(el)) : [];
      this.state.stocks = queries.stock && queries.stock.length ? queries.stock.map((el) => parseInt(el)) : [];
      this.state.searchText = queries.search && queries.search.length ? queries.search[0] : '';
      this.state.productsSortBy =
        queries.sort && queries.sort.length ? (queries.sort[0] as ProductsSortBy) : 'price-DESC';
      this.state.productsViewBy = queries.view && queries.view.length ? (queries.view[0] as ViewOptions) : 'Big-cards';
    }
    this.filterProducts();
  }

  getLimitPageFromUrl() {
    if (this.getUrlQuery()) {
      const urlQuery = this.getUrlQuery()?.split('&');
      const queries: { [key: string]: string } = {};
      urlQuery.forEach((el) => {
        const [type = '', query = ''] = el.split('=');
        queries[type] = query;
      });
      return queries;
    }
    return {};
  }

  getUrlParams() {
    return this.state.urlParams;
  }

  setUrlParams(value: string) {
    this.state.urlParams = value;
  }

  getUrlQuery() {
    return this.state.urlQuery;
  }

  setUrlQuery(value: string) {
    this.state.urlQuery = value;
  }

  getCategoriesScrollPosition() {
    return this.state.categoriesScrollPosition;
  }

  setCategoriesScrollPosition(value: number) {
    this.state.categoriesScrollPosition = value;
  }

  getBrandsScrollPosition() {
    return this.state.brandsScrollPosition;
  }

  setBrandsScrollPosition(value: number) {
    this.state.brandsScrollPosition = value;
  }

  getSearchText() {
    return this.state.searchText;
  }

  setSearchText(value: string) {
    this.state.searchText = value;
  }

  getProductsForView() {
    const products = this.state.products.map((prod) => {
      const productInCart = this.state.cart.find((el) => el.id === prod.id);
      if (productInCart) {
        prod.isInCart = true;
      } else {
        prod.isInCart = false;
      }
      return prod;
    });

    return products;
  }

  getProductsFoundCount() {
    return this.state.products.length;
  }

  getProductsSortBy() {
    return this.state.productsSortBy;
  }

  setProductsSortBy(value: ProductsSortBy) {
    return (this.state.productsSortBy = value);
  }

  getProductsViewBy() {
    return this.state.productsViewBy;
  }

  setProductsViewBy(value: ViewOptions) {
    return (this.state.productsViewBy = value);
  }

  setCheckedCategories(value: string[]) {
    this.state.checkedCategories = value;
  }
  getCheckedCategories() {
    return this.state.checkedCategories;
  }

  setCheckedBrands(value: string[]) {
    this.state.checkedBrands = value;
  }
  getCheckedBrands() {
    return this.state.checkedBrands;
  }

  getCategories(products: ProductI[]) {
    const categories = products.reduce((acc, { category }) => {
      acc[category] = category;
      return acc;
    }, {} as { [key: string]: string });
    return Object.values(categories);
  }

  getCategoriesWithCount(products: ProductI[]) {
    const categories: { [key: string]: number } = {};
    products.forEach((product) => {
      categories[product.category] = categories[product.category] ? categories[product.category] + 1 : 1;
    });
    return categories;
  }

  getBrands(products: ProductI[]) {
    const brandsTemp: string[] = [];
    const brands: string[] = [];
    products.forEach((product) => {
      const lower = product.brand.toLowerCase();
      if (!brandsTemp.includes(lower)) {
        brandsTemp.push(lower);
        brands.push(product.brand);
      }
    });
    return brands;
  }

  getBrandsWithCount(products: ProductI[]) {
    const brands: { [key: string]: number } = {};
    products.forEach(({ brand }) => {
      const brand_ = brand.toLowerCase();
      brands[brand_] = brands[brand_] ? brands[brand_] + 1 : 1;
    });
    return brands;
  }

  getMinMaxPrices(products?: ProductI[]) {
    if (products) {
      const prices = products.map(({ price }) => {
        return price;
      });

      return [Math.min(...prices), Math.max(...prices)];
    } else {
      return this.state.prices;
    }
  }

  setMinMaxPrices(minMax: number[]) {
    this.state.prices = [...minMax];
  }

  getMinMaxStock(products?: ProductI[]) {
    if (products) {
      const stock_ = products.map(({ stock }) => {
        return stock;
      });

      return [Math.min(...stock_), Math.max(...stock_)];
    } else {
      return this.state.stocks;
    }
  }

  setMinMaxStock(minMax: number[]) {
    this.state.stocks = [...minMax];
  }

  sortingProducts(products: ProductI[], initial?: boolean) {
    const sortByValue = this.state.productsSortBy;
    const [sortBy, order] = sortByValue.split('-');

    const sortedProducts: ProductI[] = products.sort((a, b) => {
      if (sortBy === SortingOptions.Price) {
        if (order === Order.ASC) {
          return a.price - b.price;
        }
        return b.price - a.price;
      }
      if (sortBy === SortingOptions.Rating) {
        if (order === Order.ASC) {
          return a.rating - b.rating;
        }
        return b.rating - a.rating;
      }
      if (sortBy === SortingOptions.Discount) {
        if (order === Order.ASC) {
          return a.discountPercentage - b.discountPercentage;
        }
        return b.discountPercentage - a.discountPercentage;
      }
      return 0;
    });
    if (initial) {
      this.initProductsState(sortedProducts);
    } else {
      this.updateProductsState(sortedProducts);
    }
  }

  filterProducts() {
    const products = this.state.initialProducts;
    let price = this.getMinMaxPrices() as [number, number];
    if (!isFinite(price[0]) || !isFinite(price[1])) {
      price = this.getMinMaxPrices(products) as [number, number];
    }
    let stock = this.getMinMaxStock() as [number, number];
    if (!isFinite(stock[0]) || !isFinite(stock[1])) {
      stock = this.getMinMaxStock(products) as [number, number];
    }
    const category = this.getCheckedCategories();
    const brand = this.getCheckedBrands();
    const text = this.getSearchText();

    const filteredProducts: ProductI[] = products
      .filter((product) => {
        if (text) {
          const searchText = text.toLowerCase().trim();
          return (
            product.brand.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText) ||
            product.title.toLowerCase().includes(searchText) ||
            String(product.price).toLowerCase().includes(searchText) ||
            String(product.stock).toLowerCase().includes(searchText)
          );
        }
        return product;
      })
      .filter((product) => {
        if (category && category.length > 0) {
          return category.includes(product.category.toLowerCase());
        }
        return product;
      })
      .filter((product) => {
        if (brand && brand.length > 0) {
          return brand.includes(product.brand.toLowerCase());
        }
        return product;
      })
      .filter((product) => {
        if (price) {
          return product.price >= price[0] && product.price <= price[1];
        }
        return product;
      })
      .filter((product) => {
        if (stock) {
          return product.stock >= stock[0] && product.stock <= stock[1];
        }
        return product;
      });

    this.sortingProducts(filteredProducts);
  }

  getCart() {
    return this.state.cart;
  }

  getProductById(id: number) {
    return this.state.initialProducts.find((el) => el.id === id);
  }

  getProductByIdForView(id: number) {
    const productInCart = this.state.cart.find((el) => el.id === id);
    const product = this.state.initialProducts.find((el) => el.id === id)!;
    if (productInCart) {
      product.isInCart = true;
    } else {
      product.isInCart = false;
    }
    return product;
  }

  addToCart(id: number) {
    const itemIdx = this.state.cart.findIndex((el) => el.id === id);
    const product = this.getProductById(id);
    if (itemIdx !== -1) {
      if (this.state.cart[itemIdx].stock > 0) {
        const left = this.state.cart.slice(0, itemIdx);
        const right = this.state.cart.slice(itemIdx + 1);
        this.state.cart[itemIdx].count += 1;
        this.state.cart[itemIdx].stock -= 1;
        this.state.cart = [...left, this.state.cart[itemIdx], ...right];
      }
    } else {
      this.state.cart.push({ id, count: 1, stock: (product?.stock as number) - 1 });
    }
    storage(StorageE.SHOP_CART, this.state.cart);
  }

  dropFromCart(id: number) {
    const itemIdx = this.state.cart.findIndex((el) => el.id === id);
    if (itemIdx !== -1) {
      if (this.state.cart[itemIdx].count > 1) {
        this.state.cart[itemIdx].count -= 1;
        this.state.cart[itemIdx].stock += 1;
      } else {
        const left = this.state.cart.slice(0, itemIdx);
        const right = this.state.cart.slice(itemIdx + 1);
        this.state.cart = [...left, ...right];
      }
    }
    storage(StorageE.SHOP_CART, this.state.cart);
  }

  getSummary() {
    const summary: SummaryI = { products: 0, total: 0, totalWithPromoCodes: 0 };
    Object.values(this.state.initialProducts).forEach((product) => {
      const prod = this.state.cart.find((el) => el.id === product.id);
      if (prod && summary) {
        summary.products += prod.count;
        summary.total += product.price * prod.count;
      }
    });
    let sum = summary.total;
    for (const code of this.state.promoCodes) {
      sum = sum - (summary.total * code.discount) / 100;
    }
    summary.totalWithPromoCodes = Number(sum.toFixed(2));
    return summary;
  }
}
