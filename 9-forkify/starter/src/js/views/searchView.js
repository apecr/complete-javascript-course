import {elements} from './base';

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
};

export const renderRecipes = ({recipes, page = 1, resPerPage = 10}) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);
};