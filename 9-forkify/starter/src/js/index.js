// Global app controller
//4123db471815928653437ec47bf2744b
//https://www.food2fork.com/api/search

/* global document, window */

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

/**
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
window.state = state;
window.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumberOfLikes());

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
    recipeView.renderRecipe(state.recipe, state.likes ? state.likes.isLiked(state.recipe.id) : false);
  }
};

/**
 * LIST CONTROLLER
 */

const controlList = () => {
  if (!state.list) {
    state.list = new List();
  }

  // Add each ingredient to the list and UI
  state.recipe.ingredients.forEach(ingredient => {
    listView.renderItem(state.list.addItem(ingredient));
  });

};

/**
 * LIKE CONTROLLER
 */
const controlLike = () => {
  if (!state.likes) {
    state.likes = new Likes();
  }

  // User has not liked current recipe
  if (!state.likes.isLiked(state.recipe.id)) {
    // Add like to the state
    const newLike = state.likes.addLike({...state.recipe, author: state.recipe.publisher});

    // Toggle the like button
    likesView.toggleLikeBtn(true);

    // Add like to the UI list
    likesView.renderLike({...state.recipe, author: state.recipe.publisher});


    // User has liked current recipe
  } else {
    // Remove like to the state
    state.likes.deleteLike(state.recipe.id);

    // Toggle the like button
    likesView.toggleLikeBtn(false);

    // Remove like to the UI list
    likesView.deleteLike(state.recipe);
  }


};

// Handle delete and update list item events

elements.shopping.addEventListener('click', event => {
  const id = event.target.closest('.shopping__item').dataset.itemid;

  // Handle the delete button
  if (event.target.matches('.shopping__delete, .shopping__delete *')) {
    // Delete from state and UI
    state.list.deleteItem(id);
    console.log(state.list);
    listView.deleteItem(id);
  }
  if (event.target.matches('.count-value')) {
    const value = parseFloat(event.target.value);
    state.list.updateCount(id, value);
  }

});

['hashchange', 'load']
  .forEach(event => window.addEventListener(event, controlRecipe));

// Restore liked recipes when on page load
window.addEventListener('load', _ => {
  state.likes = new Likes();
  state.likes.readStorage();
  likesView.toggleLikeMenu(state.likes.length);
  state.likes.likes.forEach(likesView.renderLike);
});


// Handling recipe button clicks
elements.recipe.addEventListener('click', event => {
  if (event.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServingsAndIngredients('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  }
  if (event.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServingsAndIngredients('inc');
    recipeView.updateServingsIngredients(state.recipe);
  }

  if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // Add ingredients to shopping list
    controlList();
  }
  if (event.target.matches('.recipe__love, .recipe__love *')) {
    controlLike();
  }
});