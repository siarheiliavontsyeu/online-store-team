export const getCheckboxFilter = ({
  label,
  data = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
}: {
  label: string;
  data?: number[];
}): string => {
  const li = (title: string, count: string) => {
    return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
      <label class="form-check-label" for="flexCheckDefault">
        {title}
      </label>$
      <span class="badge bg-primary rounded-pill">${count}</span>
    </li>
    `;
  };

  const content = data
    .map((el) => {
      return li('name', '5/5');
    })
    .join('');

  return `
  <div class="card text-white bg-dark mb-3" style="max-width: 20rem;">
    <div class="card-header">${label}</div>
    <div class="card-body pre-scrollable">
      <ul class="list-group">
      ${content}
      </ul>
    </div>
  </div>`;
};

export const getTemplate = (): string => {
  return `
    ${getCheckboxFilter({ label: 'Category' })}
    ${getCheckboxFilter({ label: 'Brand' })}
 `;
};
