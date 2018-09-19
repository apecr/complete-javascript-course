import { elements } from './base';

const limitRecipeTitle = (title, limit = 17) => title.length > limit
  ? `${title.split(' ').reduce((acc, word) => {
    return acc.length + word.length > limit ? acc : `${acc}${word} `;
  }, '').trim()} ...`
  : title;

const renderRecipe = recipe => {
  const markup = ` 
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

export const getInput = __ => elements.searchInput.value;

export const clearInput = _ => {
  elements.searchInput.value = '';
};

export const clearResults = _ => {
  elements.searchResultList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

// type: prev or next
const buildButtonHtml = (page, type) => {
  const html = `
      <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
      </button>
  `;
  return html;
};


const renderButtons = ({ page, numResults, resPerPage }) => {
  const pages = Math.ceil(numResults / resPerPage);
  const pageOne = pag => pag === 1;
  const pageMiddle = pag => pag < pages && pag > 1;
  const pageLast = pag => pag === pages && pages > 1;
  const firstPageButton = pag => buildButtonHtml(pag, 'next');
  const anyPageButtons = pag => `${buildButtonHtml(pag, 'prev')}${buildButtonHtml(pag, 'next')}`;
  const lastPageButton = pag => buildButtonHtml(pag, 'prev');

  const renderByCondition = pageCond => {
    const pagesConditions = [
      {
        cond: pageOne,
        func: firstPageButton
      },
      {
        cond: pageMiddle,
        func: anyPageButtons
      },
      {
        cond: pageLast,
        func: lastPageButton
      }
    ];
    return pagesConditions
      .find(conditionAndFunction =>
        conditionAndFunction.cond(pageCond)).func;
  };

  const button = renderByCondition(page).call(undefined, page);
  elements.searchResPages.insertAdjacentHTML('afterbegin', button);


};

export const renderRecipes = ({ recipes, page = 2, resPerPage = 10 }) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);
  renderButtons({ page, numResults: recipes.length, resPerPage });
};