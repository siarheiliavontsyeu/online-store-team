import { ProductI } from '../../constants/types';

const getPhotos = (photos: Array<string>) => {
  const template = photos.map((photo, index) => `<img id ="${index+1}" src="${photo}" class="photo-item">`);
  return template.join('');
};

const getRatingStars = (rating: number) =>
  rating < 4.5 ? '<i class="fas fa-star-half-alt"></i>' : '<i class="fas fa-star"></i>';

export const renderProductDetails = (card: ProductI) => {
  const buttonAdd = `<button id="add-to-cart-btn-${card.id}" type="button" class="btn btn-product btn-warning"><i class="fas fa-cart-plus"></i> Add</button>`;
  const buttonDrop = `<button id="drop-from-cart-btn-${card.id}" type="button" class="btn btn-product btn-danger"><i class="fas fa-trash-alt"></i> Drop</button>`;

  return `<div class="container">
  <div class="link-navigation text-warning">Store -> ${card.category} -> ${card.brand} -> ${card.title}</div>
  <div class="card">
    <div class="product-wrapper">
      <h4 class="product-title-details card-header bg-primary">${card.title}</h4>
      <div class="product-data">
        <div class="product-photos">
          <div class="slides">
            ${getPhotos(card.images)}
          </div>
          <div class="main-photo-wrapper">
            <div class='main-photo' style='background: url(${card.thumbnail}) 0px 0px / contain no-repeat'></div>
            <div class='d-flex justify-content-between mb-2'>
            <p class="text-muted mb-0">Rating: </p>
            <div class="ms-auto text-warning">
              <i class="fa fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              ${getRatingStars(card.rating)}
            </div>
            </div>
          </div>
        </div>
        <div class="product-inf">
          <div class="product-detail-item">
            <h5 class="bg-info">Description:</h5>
            <p>${card.description}</p>
          </div>
          <div class="product-detail-item">
            <h5 class="bg-info">Category:</h5>
            <p>${card.category}</p>
          </div>
          <div class="product-detail-item">
            <h5 class="bg-info">Brand:</h5>
            <p>${card.brand}</p>
          </div>
          <div class="product-detail-item">
            <h5 class="bg-info">Stock:</h5>
            <p>${card.stock}</p>
          </div>
        </div>
        <div class="add-to-card">
          <p class="product-price text-danger"><s>${card.price + card.discountPercentage} $</s></p>
          <div class="product-price">${card.price} $</div>
          ${card.isInCart ? buttonDrop : buttonAdd}
          <button class="btn btn-details btn-outline-warning"><i class="fas fa-money-check"></i> Buy now</button>
        </div>
      </div>

    </div>
  </div>
</div>
</div>
  `;
};

