import { ProductI } from '../../../../../constants/types';

const getRatingStars = (rating: number) => rating < 4.5 
? '<i class="fas fa-star-half-alt"></i>' 
: '<i class="fas fa-star"></i>';


export const renderProductCard = (card: ProductI) => {
  return `<div class="card product-card">
  <h5 class="card-header">${card.brand}</h5>
  <img src=${card.images[0]} class="card-img-top" alt=${card.title}>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <p class="text-muted mb-0">Available: <span class="fw-bold">${card.stock}</span></p>
    </li>
  </ul>
  <div class="card-body">
  <div class="d-flex justify-content-between mb-2">
  <p class="text-muted mb-0">Rating: </span></p>
  <div class="ms-auto text-warning">
    <i class="fa fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
      ${getRatingStars(card.rating)}
    </div>
  </div>
  <div class="d-flex justify-content-between">
    <p class="small text-muted">${card.category}</p>
    <p class="small text-danger"><s>${card.price + card.discountPercentage}</s></p>
  </div>
  <div class="d-flex justify-content-between mb-3">
    <h6 class="mb-0">${card.title}</h6>
    <h6 class="text-light mb-0">$${card.price}</h6>
  </div>
  <div class="buttons-wrapper">
    <button type="button" class="btn btn-product btn-warning">Add to cart</button>
    <a href="#product/${card.id}" class="btn btn-product btn-info">Details</a>
  </div>
  </div>
</div>
`
};

