export const getTemplate = (): string => {
  return `
  <div class="card text-white bg-dark mb-3" style="max-width: 20rem;">
    <div class="card-header text-warning"><i class="fas fa-box-check"></i> Summary</div>
    <div class="card-body d-flex flex-column justify-content-center align-items-center">
      <p class="text-warning">Products: 45</p>
      <p class="text-warning">Total: <i class="fas fa-euro-sign"></i>27,286.00</p>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Enter promo code" id="promo">
        <p class="text-muted">Promo for test: 'RS', 'EPM'</p>
      </div>
      <button id="buy-now" type="button" class="btn btn-danger">
      <i class="fas fa-shopping-cart"></i> BUY NOW
      </button>
    </div>
  </div>`;
};
