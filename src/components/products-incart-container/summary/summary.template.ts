import { PromoCodesI, SummaryI } from '../../../constants/types';

const getAppliedPromoCodesTable = (codes: PromoCodesI[]) => {
  const tr = () => {
    return codes
      .map((promo) => {
        return `
    <tr class="table-active">
      <th scope="row" class="d-flex justify-content-between align-items-center">
      <span>${promo.text} - ${promo.discount}%</span>
      <button type="button" data-promo="${promo.text}" class="js-drop btn btn-outline-danger">
      <i data-promo="${promo.text}" class="fas fa-trash-alt"></i></button>
      </th>
    </tr>
    `;
      })
      .join('');
  };
  return `
  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Applied codes</th>
    </tr>
  </thead>
  <tbody>
   ${tr()}
  </tbody>
  </table>
  `;
};

export const getTemplate = (summary: SummaryI, initialPromoCodes: PromoCodesI[], promoCodes: PromoCodesI[]): string => {
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
      <div class="mb-3 w-100">
        ${promoCodes.length > 0 ? getAppliedPromoCodesTable(promoCodes) : ''}
      </div>
      <div class="form-group">
        <input type="search" class="form-control" placeholder="Enter promo code" id="add-promo">
        <p class="text-muted">Promo for test: ${codes}</p>
      </div>
      <button id="buy-now" type="button" class="btn btn-danger">
      <i class="fas fa-money-check"></i> BUY NOW
      </button>
    </div>
  </div>`;
};
