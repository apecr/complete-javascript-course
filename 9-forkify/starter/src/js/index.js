// Global app controller
//4123db471815928653437ec47bf2744b
//https://www.food2fork.com/api/search

/* global document */

import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';

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

const r = new Recipe('2658');
r.getRecipe();