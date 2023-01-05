import { ProductI } from '../../constants/types';

const getPhotos = (photos: Array<String>) => {
  const template = photos.map((photo) => (`<img src="${photo}" class="photo-item">`));
  return template.join('');
};

export const renderProductDetails = (card: ProductI) => {
  
    return `<div class="container" >
    <div class="link-navigation text-warning">Store -> ${card.category} -> ${card.brand} -> ${card.title}</div>
    <div class="card" >
    <div class="product-wrapper">
      <h4 class="product-title-details card-header bg-primary">${card.title}</h4>
      <div class="product-data">
        <div class="product-photos">
          <div class="slides">
          ${getPhotos(card.images)}
          </div>
          <div class="main-photo">
            <img src="${card.thumbnail}" alt="main-photo">
          </div>
        </div>
        <div class="product-inf">
          <div class="product-detail-item"><h6 class="bg-info">Description:</h6> <p>${card.description}</p></div>
          <div class="product-detail-item"><h6 class="bg-info">Category:</h6> <p>${card.category}</p></div>
          <div class="product-detail-item"><h6 class="bg-info">Brand:</h6> <p>${card.brand}</p></div>
          <div class="product-detail-item"><h6 class="bg-info">Discount:</h6> <p>${card.discountPercentage}</p></div>
          <div class="product-detail-item"><h6 class="bg-info">Rating:</h6> <p>${card.rating}</p></div>
          <div class="product-detail-item"><h6 class="bg-info">Stock:</h6> <p>${card.stock}</p></div>
        </div>
        <div class="add-to-card">
          <div class="product-price">${card.price} $</div>
          <button class="btn btn-warning">Add to cart</button>
          <button class="btn btn-outline-warning">Buy now</button>
        </div>
      </div>
    </div>
    </div>
  </div>
  `
  };