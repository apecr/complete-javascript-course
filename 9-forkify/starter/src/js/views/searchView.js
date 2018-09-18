import {elements} from './base';


const renderRecipe = recipe => {
  // image_url
  // publisher
  // recipe_id
  // title
  const markup = ` 
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

export const getInput = __ => elements.searchInput.value;

export const renderRecipes = recipes => {
  recipes.forEach(renderRecipe);
};

export const clearInput = _ => {
  elements.searchInput.value = '';
};

export const clearResults = _ => {
  elements.searchResultList.innerHTML = '';
};