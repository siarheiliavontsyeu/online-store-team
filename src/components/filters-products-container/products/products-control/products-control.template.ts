export const getTemplate = ({productsFoundCount} : {productsFoundCount: number}) => {
  return `
  <div class="card bg-dark">
    <div class="card-body">
      <div class="card-body__item dropdown">
        <a class="nav-link dropdown-toggle text-warning" 
           data-bs-toggle="dropdown" 
           href="#" 
           role="button"
           aria-haspopup="true" 
           aria-expanded="false">Sort options</a>
        <div class="dropdown-menu" 
        style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 42px);" >
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
      <div class="card-body__item text-info">
        Found: <span class="found-count">${String(productsFoundCount)}</span>
      </div>
      <div class="card-body__item dropdown">
        <a class="nav-link dropdown-toggle text-warning" 
           data-bs-toggle="dropdown" 
           href="#" 
           role="button"
           aria-haspopup="true" 
           aria-expanded="false">View options</a>
        <div class="dropdown-menu" 
        style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 42px);" >
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
    </div>
  </div>  
  `;
};
