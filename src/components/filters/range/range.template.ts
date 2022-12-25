import { FilterDataI, Groups } from '../../../constants/types';

export const getTemplate = ({ group, currentData, initData }: FilterDataI): string => {
  const [min, max] = currentData as number[];
  const [initMin, initMax] = initData as number[];
  const icon = group === Groups.Price ? 'fa-euro-sign' : 'fa-box';

  const multiRange = `
 
  <div class="prices">
    <div class="prices__item" id="price-mini">
      <i class="fas ${icon}"></i> ${min}
    </div>
    <div class="prices__item" id="price-maxi">
      <i class="fas ${icon}"></i> ${max}
    </div>
  </div>
  <input class="multi-range__slide" type="range" min="${initMin}" max="${initMax}" value="${min}" id="miniSlide">
  <input class="multi-range__slide" type="range" min="${initMin}" max="${initMax}" value="${max}" id="maxiSlide">
  `;

  return `
  <div class="card text-white bg-dark mb-3" style="max-width: 20rem;">
    <div class="card-header text-warning"><i class="fas ${icon}"></i> ${group}</div>
    <div class="card-body">
    <div class="multi-range">
    ${min >= 0 && max >= 0 ? multiRange : '<p class="text-danger">Not found</p>'}
    </div>
    </div>
  </div>`;
};
