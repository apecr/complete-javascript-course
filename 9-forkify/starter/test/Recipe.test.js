
import 'babel-polyfill';
import Recipe from './../lib/js/models/Recipe';
import {expect} from 'chai';

/*global describe, it*/
describe('Testing Recipe', () => {
  it('Should create a recipe', async() => {
    const recipe1 = new Recipe(2658);
    await recipe1.getRecipe();
    expect(recipe1.url).to.be.equal('http://static.food2fork.com/14573f089.jpg');
    recipe1.parseIngredients();

    recipe1.ingredients.forEach(ing => console.log(ing));
    expect(recipe1.ingredients[3].ingredient.includes('(')).to.be.equal(false);
  });
});