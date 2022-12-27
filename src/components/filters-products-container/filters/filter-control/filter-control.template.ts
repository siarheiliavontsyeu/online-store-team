export const getTemplate = (): string => {
  return `
  <div class="card text-white bg-dark mb-3" style="max-width: 20rem;">
    <div class="card-header text-warning"><i class="fas fa-tools"></i> Filters control</div>
    <div class="card-body">
      <button id="filters-reset" type="button" class="btn btn-primary"><i class="fas fa-undo"></i> Reset Filters</button>
      <button id="filters-copy" type="button" class="btn btn-outline-warning"><i class="fas fa-copy"></i> Copy Link</button>
    </div>
  </div>`;
};
