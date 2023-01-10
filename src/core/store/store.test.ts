import { FilterBy } from '../../constants/types';
import Store from './store.core';

describe('Store: initial', () => {
  it('has the correct initial state', () => {
    const store = new Store();
    expect(store.state).toEqual({
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
      searchText: '',
      filterBy: FilterBy.null,
      urlQuery: '',
      urlParams: '',
      initialPromoCodes: [
        { text: 'ALI', discount: 15 },
        { text: 'SIA', discount: 5 },
      ],
      promoCodes: [],
    });
  });
});

describe('Store: pickPromoCode', () => {
  it('adds a valid promo code to the promo codes list', () => {
    const store = new Store();
    const code = store.pickPromoCode('ali');
    expect(code).toEqual({ text: 'ALI', discount: 15 });
    expect(store.state.promoCodes).toEqual([{ text: 'ALI', discount: 15 }]);
  });

  it('does not add an invalid promo code to the promo codes list', () => {
    const store = new Store();
    const code = store.pickPromoCode('invalid');
    expect(code).toEqual(false);
    expect(store.state.promoCodes).toEqual([]);
  });

  it('does not add a promo code that is already in the promo codes list', () => {
    const store = new Store();
    store.state.promoCodes = [{ text: 'ALI', discount: 15 }];
    const code = store.pickPromoCode('ali');
    expect(code).toEqual(false);
    expect(store.state.promoCodes).toEqual([{ text: 'ALI', discount: 15 }]);
  });
});

describe('Store: dropPromoCode', () => {
  it('removes a promo code from the promo codes list', () => {
    const store = new Store();
    store.state.promoCodes = [
      { text: 'ALI', discount: 15 },
      { text: 'SIA', discount: 5 },
    ];
    store.dropPromoCode('ali');
    expect(store.state.promoCodes).toEqual([{ text: 'SIA', discount: 5 }]);
  });

  it('does not remove a promo code that is not in the promo codes list', () => {
    const store = new Store();
    store.state.promoCodes = [
      { text: 'ALI', discount: 15 },
      { text: 'SIA', discount: 5 },
    ];
    store.dropPromoCode('invalid');
    expect(store.state.promoCodes).toEqual([
      { text: 'ALI', discount: 15 },
      { text: 'SIA', discount: 5 },
    ]);
  });
});
