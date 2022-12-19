import { CategoriesT, ProductsResponseI } from '../constants/types';

const BASE_URL = 'https://dummyjson.com';

export default class Api {
  async getResponse(url: string): Promise<Response> {
    const response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response;
  }
  async getProducts(limit = '100') {
    const response: Response = await this.getResponse(`${BASE_URL}/products?limit=${limit}`);
    const content = (await response.json()) as ProductsResponseI;
    return content;
  }

  async getCategories() {
    const response: Response = await this.getResponse(`${BASE_URL}/products/categories`);
    const content = (await response.json()) as CategoriesT;
    return content;
  }
}
