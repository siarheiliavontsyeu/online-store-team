import { StateI } from '../../constants/types';

export const getCheckboxFilter = ({
  group,
  initData,
  currentData,
}: {
  group: string;
  initData: { [key: string]: number };
  currentData: { [key: string]: number };
}): string => {
  const li = (key: string, currentValue: number, value: number) => {
    const isActive = currentValue !== 0;
    const badgeStatusClass = isActive ? 'bg-primary' : 'text-muted bg-dark';
    const formCheckStatusClass = isActive ? '' : 'text-muted';
    return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <div class="form-check ${formCheckStatusClass}">
          <input class="form-check-input" type="checkbox" value="" id=" ${key}">
          <label class="form-check-label" for=" ${key}">
            ${key}
          </label>
        </div>     
      <span class="badge ${badgeStatusClass} rounded-pill">${currentValue}/${value}</span>
    </li>
    `;
  };

  const content = Object.keys(initData)
    .map((key) => {
      const maxValue = initData[key];
      const currentValue = currentData[key] ?? 0;
      return li(key, currentValue, maxValue);
    })
    .join('');

  return `
  <div class="card text-white bg-dark mb-3" style="max-width: 20rem;">
    <div class="card-header text-warning">${group}</div>
    <div class="card-body pre-scrollable">
      <ul class="list-group">
      ${content}
      </ul>
    </div>
  </div>`;
};

export const getTemplate = (state: StateI): string => {
  const { initialBrands, initialCategories, brands, categories, prices, stocks } = state;
  return `
    ${getCheckboxFilter({ group: 'category', initData: initialCategories, currentData: categories })}
    ${getCheckboxFilter({ group: 'brand', initData: initialBrands, currentData: brands })}
 `;
};
