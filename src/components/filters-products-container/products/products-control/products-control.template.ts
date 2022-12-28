import { SORT_BY_VALUES } from '../../../../constants/data';
import { ProductsSortBy } from '../../../../constants/types';

const getSortDropDownMenuItems = () => {
  const items = SORT_BY_VALUES.map((item) => {
    return `<a class="dropdown-item sort" data-dropdown-value="${item}" href="#">${item}</a>`;
  });
  return items.join('');
};

//TODO
const getViewDropDownMenuItems = () => {
  return ``;
};

export const getTemplate = ({ productsFoundCount, sortBy }: { productsFoundCount: number; sortBy: ProductsSortBy }) => {
  const title = `Sort by ${sortBy}`;
  return `
  <div class="card bg-dark">
    <div class="card-body">
      <div class="card-body__item dropdown">
        <a class="nav-link dropdown-toggle text-warning"
           id="products-sort"
           data-bs-toggle="dropdown" 
           href="#" 
           role="button"
           aria-haspopup="true" 
           aria-expanded="false">${title}</a>
        <div class="dropdown-menu" data-for-id="products-sort" 
        style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 30px);" >
         ${getSortDropDownMenuItems()}
        </div>
      </div>
      <div class="card-body__item text-info">
        Found: <span class="found-count">${String(productsFoundCount)}</span>
      </div>
      <div class="card-body__item dropdown">
        <a class="nav-link dropdown-toggle text-warning"
           id="products-view" 
           data-bs-toggle="dropdown" 
           href="#" 
           role="button"
           aria-haspopup="true" 
           aria-expanded="false">View options</a>
        <div class="dropdown-menu" data-for-id="products-view"
        style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 30px);" >
        ${getViewDropDownMenuItems()}
        </div>
      </div>
    </div>
  </div>  
  `;
};
