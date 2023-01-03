import { ProductI } from '../../constants/types';

export const renderProductDetails = (currentItem: string | undefined, card: ProductI) => {
    return `<div class="product-details card ">
      <div class="product-wrapper" style="background: url(') 0% 0% / cover">
      <h4 class="product-title card-header bg-primary">${card.title}</h4>
      <a href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/online-store-team/modules/store-page.md">Hello!</a>
        <div class="product-info">
          <div class="product-info__category">Category: card.category</div>
          <div class="product-info__brand">Brand: card.brand</div>
          <div class="product-info__price">Price: card.price</div>
          <div class="product-info__discount">Discount: card.discountPercentage</div>
          <div class="product-info__rating">Rating: card.rating</div>
          <div class="product-info__stock">Stock: card.stock</div>
        </div>
      </div>
      <div class="buttons-wrapper">
      <button type="button" class="btn btn-success">Add to cart</button>
      <a href="#main" class="btn btn-link btn-info">Details</a>
      </div>
    </div>
  `
  };