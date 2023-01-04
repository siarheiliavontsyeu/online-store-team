import { ProductI } from '../../constants/types';

const getPhotos = (photos: Array<String>) => {
  const template = photos.map((photo) => (`<img src="${photo}" class="photo-item">`));
  return template.join('');
};

// const getProductInfo = (card: ProductI) => {
//   const template: string[] = [];
//   for (var key in card){
//     template.push(`<div class="product-info__${key}">${key}: ${card.key}</div>`)
//   }
//   return template.join('');
// };


export const renderProductDetails = (card: ProductI) => {
  
    return `<div class="product-details card " >
    <div class="product-wrapper">
      <h4 class="product-title card-header bg-primary">${card.title}</h4>
      <div class="product-data">
        <div class="product-photos">
          <div class="slides">
          ${getPhotos(card.images)}
          </div>
          <div class="main-photo">
            <img src="${card.thumbnail}" alt="main-photo">
          </div>
        </div>
        <div class="product-info">
          <div class="product-info__description">Description: ${card.description}</div>
          <div class="product-info__category">Category: ${card.category}</div>
          <div class="product-info__brand">Brand: ${card.brand}</div>
          <div class="product-info__discount">Discount: ${card.discountPercentage}</div>
          <div class="product-info__rating">Rating: ${card.rating}</div>
          <div class="product-info__stock">Stock: ${card.stock}</div>
        </div>
        <div class="add-to-card">
          <div class="product-price">${card.price} $</div>
          <button class="btn btn-success">Add to cart</button>
          <button class="btn btn-success">Buy now</button>
        </div>
      </div>
    </div>
  </div>
  `
  };