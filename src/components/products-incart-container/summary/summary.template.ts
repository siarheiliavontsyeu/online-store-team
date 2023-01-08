import { PromoCodesI, SummaryI } from '../../../constants/types';

export const getTemplate = (summary: SummaryI, initialPromoCodes: PromoCodesI[]): string => {
  const codes: string = initialPromoCodes.map((code) => code.text).join(', ');
  return `
  <div class="card text-white bg-dark mb-3" style="max-width: 20rem;">
    <div class="card-header text-warning"><i class="fas fa-box-check"></i> Summary</div>
    <div class="card-body d-flex flex-column justify-content-center align-items-center">
      <p class="text-warning">Products: ${summary.products}</p>
      ${
        summary.totalWithPromoCodes !== summary.total
          ? `<s><p class="text-warning">Total: <i class="fas fa-euro-sign"></i>${summary.total}</p></s>
          <p class="text-warning">Total: <i class="fas fa-euro-sign"></i>${summary.totalWithPromoCodes}</p>`
          : `<p class="text-warning">Total: <i class="fas fa-euro-sign"></i>${summary.total}</p>`
      }
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Enter promo code" id="promo">
        <p class="text-muted">Promo for test: ${codes}</p>
      </div>
      <button id="buy-now" type="button" class="btn btn-danger">
      <i class="fas fa-money-check"></i> BUY NOW
      </button>
    </div>
  </div>`;
};
