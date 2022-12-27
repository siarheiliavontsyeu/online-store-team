import { ProductI } from '../../../../../constants/types';

export const renderProductCard = (card: ProductI) => {
  return `<div class="product-card card bg-primary">
    <div class="product-wrapper">
      <h4 class="product-title card-header">${card.title}</h4>
      <img class="product-image" src="${card.images[0]}" alt="${card.title}"></img>
      <div class="product-info">
        <div class="product-info__category">Category: ${card.category}</div>
        <div class="product-info__brand">Brand: ${card.brand}</div>
        <div class="product-info__price">Price: ${card.price}</div>
        <div class="product-info__discount">Discount: ${card.discountPercentage}</div>
        <div class="product-info__rating">Rating: ${card.rating}</div>
        <div class="product-info__stock">Stock: ${card.stock}</div>
      </div>
    </div>
  </div>`;
};
