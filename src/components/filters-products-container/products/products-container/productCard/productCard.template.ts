import { ProductI } from '../../../../../constants/types';

export const renderProductCard = (card: ProductI) => {
  return `<div id="product-card-${card.id}" class="product-card not-in-cart card " >
  
    <div class="product-wrapper" style="background: url(${card.images[0]}) 0% 0% / cover">
    <h4 class="product-title card-header bg-primary">${card.title}</h4>
      <div class="product-info">
        <div class="product-info__category">Category: ${card.category}</div>
        <div class="product-info__brand">Brand: ${card.brand}</div>
        <div class="product-info__price">Price: ${card.price}</div>
        <div class="product-info__discount">Discount: ${card.discountPercentage}</div>
        <div class="product-info__rating">Rating: ${card.rating}</div>
        <div class="product-info__stock">Stock: ${card.stock}</div>
      </div>
    </div>
    <div class="buttons-wrapper">
    <button id="add-to-cart-btn-${card.id}" type="button" class="btn btn-product btn-warning">Add to cart</button>
    <a href="#product/${card.id}" class="btn btn-product btn-info">Details</a>
    </div>
  </div>
`
};

