import { ProductI } from '../constants/types';

export const getCategories = (products: ProductI[]) => {
  const categories: string[] = [];
  products.map((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });
  return categories;
};

export const getCategoriesWithCount = (products: ProductI[]) => {
  const categories: { [key: string]: number } = {};
  products.forEach((product) => {
    categories[product.category] = categories[product.category] ? categories[product.category] + 1 : 1;
  });
  return categories;
};

export const getBrands = (products: ProductI[]) => {
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
};

export const getBrandsWithCount = (products: ProductI[]) => {
  const brands: { [key: string]: number } = {};
  products.forEach((product) => {
    let brand = product.brand;
    if (brand === 'APPle') {
      brand = 'Apple';
    }
    brands[brand] = brands[brand] ? brands[brand] + 1 : 1;
  });
  return brands;
};

export const getMinMaxPrices = (products: ProductI[]) => {
  const prices = products.map((product) => {
    return product.price;
  });

  return [Math.min(...prices), Math.max(...prices)];
};

export const getMinMaxStock = (products: ProductI[]) => {
  const stock = products.map((product) => {
    return product.stock;
  });

  return [Math.min(...stock), Math.max(...stock)];
};

export const filterProducts = (filter: {
  products: ProductI[];
  category?: string;
  brand?: string;
  price?: [number, number];
  stock?: [number, number];
  text?: string;
}) => {
  const { products, category, brand, price, stock, text } = filter;
  const filteredProducts: ProductI[] = products
    .filter((product) => {
      if (category) {
        return product.category.toLowerCase() === category.toLowerCase();
      }
      return product;
    })
    .filter((product) => {
      if (brand) {
        return product.brand.toLowerCase() === brand.toLowerCase();
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
        const searchText = text.toLowerCase();
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

  return filteredProducts;
};

export const getData = (products: ProductI[]) => {
  const categories2 = getCategoriesWithCount(products);
  console.log(categories2);
  const brands2 = getBrandsWithCount(products);
  console.log(brands2);
  const prices = getMinMaxPrices(products);
  console.log(prices);
  const stock = getMinMaxStock(products);
  console.log(stock);
};
