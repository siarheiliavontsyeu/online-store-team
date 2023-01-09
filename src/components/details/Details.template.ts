import { ProductI } from '../../constants/types';

const getPhotos = (photos: Array<string>) => {
  const template = photos.map((photo, index) => `<img id ="${index+1}" src="${photo}" class="photo-item">`);
  return template.join('');
};

export const renderProductDetails = (card: ProductI) => {
  const buttonAdd = `<button id="add-to-cart-btn-${card.id}" type="button" class="btn btn-product btn-warning"><i class="fas fa-cart-plus"></i> Add</button>`;
  const buttonDrop = `<button id="drop-from-cart-btn-${card.id}" type="button" class="btn btn-product btn-danger"><i class="fas fa-trash-alt"></i> Drop</button>`;

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
          <div class="main-photo-wrapper">     
            <div class='main-photo' style='background: url(${card.thumbnail}) 0px 0px / contain no-repeat'></div>
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
          ${card.isInCart ? buttonDrop : buttonAdd}
          <button class="btn btn-details btn-outline-warning"><i class="fas fa-money-check"></i> Buy now</button>
        </div>
      </div>
    </div>
    </div>
  </div>
  `;
};

