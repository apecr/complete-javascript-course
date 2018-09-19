/* global document*/

export const elements = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  searchResultList: document.querySelector('.results__list'),
  searchRes: document.querySelector('.results'),
  searchResPages: document.querySelector('.results__pages')
};

const elementLoader = 'loader';

export const renderLoader = parent => {
  const loader = `
      <div class="${elementLoader}">
        <svg>
          <use href="img/icons.svg#icon-cw"></use>
        </svg>
      </div>
    `;

  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = _ => {
  const loader = document.querySelector(`.${elementLoader}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};