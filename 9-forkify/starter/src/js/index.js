// Global app controller
//4123db471815928653437ec47bf2744b
//https://www.food2fork.com/api/search

/* global document, window */

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

/**
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

const controlSearch = async _ => {
  // 1) Get the query from the view
  const query = searchView.getInput();
  if (query) {

    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // 4) Search for recipes
    await state.search.getResults();
    clearLoader();

    // 5) Render the results in the UI
    searchView.renderRecipes({ recipes: state.search.result });

  }

};

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {

  const btn = e.target.closest('.btn-inline');
  console.log(btn);
  if (btn) {
    const goToPage = btn.dataset.goto;
    searchView.clearResults();
    searchView.renderRecipes({ recipes: state.search.result, page: parseInt(goToPage) });
  }
});


/**
 * RECIPE CONTROLLER
 */

const controlRecipe = async _ => {
  // Get ID from url
  const hashId = window.location.hash.replace('#', '');

  if (hashId) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected search
    if (state.search) {
      searchView.highlightSelected(hashId);
    }

    // Create new recipe object
    state.recipe = new Recipe(hashId);

    // Get recipe data
    await state.recipe.getRecipe();
    state.recipe.parseIngredients();

    // Calculate servings and time
    state.recipe.calcTime();
    state.recipe.calcServings();

    // Render the recipe
    clearLoader();
    recipeView.renderRecipe(state.recipe);
  }
};

['hashchange', 'load']
  .forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', event => {
  if (event.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  }
  if (event.tartget.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  }
});

window.l = new List();