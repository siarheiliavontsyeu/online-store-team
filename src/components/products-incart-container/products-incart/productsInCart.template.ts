import { CartI } from '../../../constants/types';

export const getTemplate = (cart: CartI[], limit = 1, page = 1): string => {
  const [limitMin, limitMax] = [1, cart.length];
  const [pageMin, pageMax] = [1, Math.ceil(cart.length / limit)];
  return `
  <div class="card text-white bg-dark mb-3">
    <div class="card-header text-warning d-flex justify-content-between">
    <div><i class="fas fa-boxes"></i> Products In Cart</div>
    <div class="d-flex">
      <div class="px-2">Limit: 
        <input type="number" id="limit"
        min="${limitMin}" 
        max="${limitMax}" value="${limit}">
      </div>
      <div class="px-2">Page: 
          <input type="number" id="page"
          min="${pageMin}"  
          max="${pageMax}" value="${page}">
        </div>
    </div>
    </div>
    <div class="card-body d-flex">
      <div class="products-incart-container w-100"></div>
    </div>
  </div>`;
};
