import { PageNames } from '../../constants/types';

export const getTemplate = (totalSum: number, totaAmount: number, pageName: PageNames) => {
  return `<header class="header bg-dark navbar">
    <div class="container">
    <a href="#" class="logo navbar-brand d-flex">
      <img src="../../assets/icons/icons8-shopping-mall-50.png" class="logo-image">
      <h2 class="name">Online store</h2>
    </a>
    <div class="header-right d-flex">
    <form class="search-form d-flex w-100 ${pageName !== PageNames.main ? 'invisible' : ''}">
      <input id="products-search" 
      class="form-control me-sm-2"
      autocomplete="off"
      type="search" placeholder="Search...">
      <button
      id="products-search-btn"
      class="btn btn-secondary my-2 my-sm-0" 
      type="submit">Search</button>
    </form>
    <div class="shopping-cart w-100">
      <div class="total-sum">$ ${totalSum}</div>
      <div class="shopping-cart-icon">
        <img src="../../assets/icons/icons8-shopping-cart-48.png" class="logo-image">
        <div class="total-amount bg-primary">${totaAmount}</div>
      </div>
    </div>
    </div>
    </div>
  </header>`;
};
