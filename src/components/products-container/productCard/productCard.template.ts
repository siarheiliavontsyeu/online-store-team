import { ProductI} from '../../../constants/types';

export const renderProductCard = (card: ProductI) => {
    return `<div class="product-card">
    <h4 class="product-title">${card.title}</h4>
    <img class="product-image" src="${card.images[0]}" alt="${card.title}"></img>
    <div class="product-info">
      <div class="product-info__category">${card.category}</div>
      <div class="product-info__brand">${card.brand}</div>
      <div class="product-info__price">${card.price}</div>
      <div class="product-info__discount">${card.discountPercentage}</div>
      <div class="product-info__rating">${card.rating}</div>
      <div class="product-info__stock">${card.stock}</div>
    </div>
  </div>`
}
