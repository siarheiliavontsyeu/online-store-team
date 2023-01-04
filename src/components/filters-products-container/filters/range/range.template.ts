import { FilterDataI, Groups } from '../../../../constants/types';

export const getTemplate = ({ group, currentData, initData, products }: FilterDataI): string => {
  const [min, max] = currentData as number[];
  const [initMin, initMax] = initData as number[];
  const icon = group === Groups.Price ? 'fa-euro-sign' : 'fa-box';

  const multiRange = `
  <div class="prices">
    <div class="prices__item" id="price-mini">
      <i class="fas ${icon}"></i> ${isFinite(min) ? min : initMin}
    </div>
    <div class="prices__item" id="price-maxi">
      <i class="fas ${icon}"></i> ${isFinite(max) ? max : initMax}
    </div>
  </div>
  <input class="multi-range__slide" type="range" min="${initMin}" max="${initMax}" value="${
    isFinite(min) ? min : initMin
  }" id="miniSlide">
  <input class="multi-range__slide" type="range" min="${initMin}" max="${initMax}" value="${
    isFinite(max) ? max : initMax
  }" id="maxiSlide">
  `;

  return `
  <div class="card text-white bg-dark mb-3" style="max-width: 20rem;">
    <div class="card-header text-warning"><i class="fas ${icon}"></i> ${group}</div>
    <div class="card-body">
    <div class="multi-range">
    ${products && products.length > 0 ? '' : '<p class="text-danger mb-0">Not found</p>'}
    ${multiRange}
    </div>
    </div>
  </div>`;
};
