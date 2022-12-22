import { FilterProductsI, ProductI, SortingOptions, StateI } from '../../constants/types';

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
      cart: [],
      checkedCategories: [],
      checkedBrands: [],
      categoriesScroll: 0,
      brandsScroll: 0,
    };
  }

  initProductsState(products: ProductI[]) {
    this.state.initialProducts = products;
    this.state.initialCategories = this.getCategoriesWithCount(products);
    this.state.initialBrands = this.getBrandsWithCount(products);
    this.state.products = products;
    this.state.categories = this.getCategoriesWithCount(products);
    this.state.brands = this.getBrandsWithCount(products);
    this.state.prices = this.getMinMaxPrices(products);
    this.state.stocks = this.getMinMaxStock(products);
  }

  updateProductsState(products: ProductI[]) {
    this.state.products = products;
    this.state.categories = this.getCategoriesWithCount(products);
    this.state.brands = this.getBrandsWithCount(products);
    this.state.prices = this.getMinMaxPrices(products);
    this.state.stocks = this.getMinMaxStock(products);
  }

  getCategoriesScroll() {
    return this.state.categoriesScroll;
  }

  setCategoriesScroll(value: number) {
    this.state.categoriesScroll = value;
  }

  getBrandsScroll() {
    return this.state.brandsScroll;
  }

  setBrandsScroll(value: number) {
    this.state.brandsScroll = value;
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

  getMinMaxPrices(products: ProductI[]) {
    const prices = products.map(({ price }) => {
      return price;
    });

    return [Math.min(...prices), Math.max(...prices)];
  }

  getMinMaxStock(products: ProductI[]) {
    const stock_ = products.map(({ stock }) => {
      return stock;
    });

    return [Math.min(...stock_), Math.max(...stock_)];
  }

  sortingProducts({ sortBy, asc = true }: { sortBy: keyof ProductI; asc: boolean }) {
    const products = this.state.products;
    const sortedProducts: ProductI[] = products.sort((a, b) => {
      if (sortBy === SortingOptions.Price) {
        if (asc) {
          return a.price - b.price;
        }
        return b.price - a.price;
      }
      if (sortBy === SortingOptions.Rating) {
        if (asc) {
          return a.rating - b.rating;
        }
        return b.rating - a.rating;
      }
      if (sortBy === SortingOptions.Discount) {
        if (asc) {
          return a.discountPercentage - b.discountPercentage;
        }
        return b.discountPercentage - a.discountPercentage;
      }
      return 0;
    });
    this.updateProductsState(sortedProducts);
  }

  filterProducts({ category, brand, price, stock, text }: FilterProductsI) {
    const products = this.state.initialProducts;

    const filteredProducts: ProductI[] = products
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
      })
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
      });

    this.updateProductsState(filteredProducts);
  }

  addToCart(id: number) {
    const itemIdx = this.state.cart.findIndex((el) => el.id === id);
    if (itemIdx !== -1) {
      const left = this.state.cart.slice(0, itemIdx);
      const right = this.state.cart.slice(itemIdx + 1);
      this.state.cart[itemIdx].count += 1;
      this.state.cart = [...left, this.state.cart[itemIdx], ...right];
    } else {
      this.state.cart.push({ id, count: 1 });
    }
  }

  dropFromCart(id: number) {
    const itemIdx = this.state.cart.findIndex((el) => el.id === id);
    if (itemIdx !== -1) {
      if (this.state.cart[itemIdx].count > 1) {
        this.state.cart[itemIdx].count -= 1;
      } else {
        const left = this.state.cart.slice(0, itemIdx);
        const right = this.state.cart.slice(itemIdx + 1);
        this.state.cart = [...left, ...right];
      }
    }
  }

  getSummary() {
    const summary = { products: 0, total: 0 };
    Object.values(this.state.initialProducts).forEach((product) => {
      const prod = this.state.cart.find((el) => el.id === product.id);
      if (prod) {
        summary.products += prod.count;
        summary.total += product.price * prod.count;
      }
    });
    return summary;
  }
}
