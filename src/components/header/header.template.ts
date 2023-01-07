import { PageNames, SummaryI } from '../../constants/types';

export const getTemplate = (summary: SummaryI, pageName: PageNames) => {
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
    <div class="shopping-cart w-50 justify-content-between">
      <div class="total-sum text-warning">Cart total: 
        <i class="fas fa-euro-sign"></i>${summary.total}</div>
      <div class="shopping-cart-icon">
        <img src="../../assets/icons/icons8-shopping-cart-48.png" class="logo-image">
        <div class="total-amount bg-primary">${summary.products}</div>
      </div>
    </div>
    </div>
    </div>
  </header>`;
};
