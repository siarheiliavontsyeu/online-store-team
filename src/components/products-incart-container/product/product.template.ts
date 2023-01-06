import { ProductI } from '../../../constants/types';

export const getTemplate = (idx: number, product: ProductI, count: number, stock: number, sum: number): string => {
  return `
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">
        <span class="badge rounded-pill bg-dark">${idx}</span>
        ${product.title}
      </h4>
      <h6 class="card-subtitle mb-2 text-muted"><em>${product.description}</em></h6>
      <div class="d-flex justify-content-between">
        <img class="cart-product__image d-block" src="${product.images[0]}" 
          alt="${product.title}">
        <div class="cart-product__wrapper d-flex justify-content-between align-items-center">
          <div class="cart-product__details d-flex flex-column">
            <span class="text-warning">Rating: ${product.rating}<i class="fas fa-star"></i></span>
            <span class="text-warning">Discount:  ${product.discountPercentage}<i class="fas fa-percent"></i></span>
          </div>
          <div class="cart-product__values d-flex flex-column align-items-center">
           <span class="text-warning mb-2">Stock:  ${stock}</span>
           <div class="text-warning mb-2">
             <button id="count-dec" type="button" class="btn btn-outline-light mx-2">
             <i class="fas fa-minus-circle"></i>
             </button> 
             <span id="count-value" class="cart-product__count">${count}</span> 
             <button id="count-inc" type="button" class="btn btn-outline-light mx-3">
             <i class="fas fa-plus-circle"></i>
             </button> </div>
           <div>
            <span class="cart-product__sum badge rounded-pill bg-info">
            <i class="fas fa-euro-sign"></i> ${sum}</span>
           </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 `;
};
