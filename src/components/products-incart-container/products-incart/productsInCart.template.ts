import { CartI } from '../../../constants/types';

export const getTemplate = (cart: CartI[]): string => {
  const [limitMin, limitMax] = [1, cart.length];
  const [pageMin, pageMax] = [1, Math.ceil(cart.length / limitMax)];
  return `
  <div class="card text-white bg-dark mb-3">
    <div class="card-header text-warning d-flex justify-content-between">
    <div><i class="fas fa-boxes"></i> Products In Cart</div>
    <div class="d-flex">
      <div class="px-2">Limit: 
        <input type="number" 
        min="${limitMin}" class="" 
        max="${limitMax}" value="3">
      </div>
      <div class="px-2">Page: 
          <input type="number" 
          min="${pageMin}" class="" 
          max="${pageMax}" value="1">
        </div>
    </div>
    </div>
    <div class="card-body d-flex">
      <div class="products-incart-container"></div>
    </div>
  </div>`;
};
