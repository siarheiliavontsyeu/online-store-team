import { FilterDataI } from '../../../constants/types';

export const getTemplate = ({ group, currentData, initData }: FilterDataI): string => {
  const [min, max] = currentData as number[];
  const [initMin, initMax] = initData as number[];
  return `
  <div class="card text-white bg-dark mb-3" style="max-width: 20rem;">
    <div class="card-header text-warning">${group}</div>
    <div class="card-body">
    <div class="multi-range">
      <div class="prices">
        <div class="prices__item" id="price-mini">${min}</div>
        <div class="prices__item" id="price-maxi">${max}</div>
      </div>
      <input class="multi-range__slide" type="range" min="${initMin}" max="${initMax}" value="${min}" id="miniSlide">
      <input class="multi-range__slide" type="range" min="${initMin}" max="${initMax}" value="${max}" id="maxiSlide">
    </div>
    </div>
  </div>`;
};
