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
  products: ProductI[];
  categories: { [key: string]: number };
  brands: { [key: string]: number };
  prices: number[];
  stocks: number[];
}

export type CategoriesT = string[];
