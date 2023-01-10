import { GITHUB, RSSCHOOL } from '../../constants/data';

export const getTemplate = () => {
  const authors = GITHUB.map((author) => {
    const { name, link } = author;
    return `
    <li class="ms-3">
      <a class="github text-warning" href="${link}" target="_blank">
        <i class="fab fa-lg fa-github"></i>
        <span>${name}</span>
      </a>
    </li>
    `;
  }).join('');

  const rsschool = `
  <a class="rsschool" href="${RSSCHOOL.link}" target="_blank">
    <img class="rsschool__img" src="${RSSCHOOL.logo}" alt="school logo" />
  </a>`;

  return `
  <div class="container d-flex flex-wrap justify-content-center align-items-center py-3 border-top">
    <ul class="nav col-md-4 justify-content-start list-unstyled d-flex">
      ${authors}
    </ul>
    <div class="col-md-4 d-flex align-items-center justify-content-end">
      ${rsschool}
      <span class="mb-3 mb-md-0 text-muted px-2">© 2022</span>
    </div>
  </div>`;
};
