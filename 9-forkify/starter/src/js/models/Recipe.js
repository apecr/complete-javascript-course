import axios from 'axios';
import { key, foodUrl } from './../config';
import _ from 'lodash';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`${foodUrl}/api/get?key=${key}&rId=${this.id}`);
      (
        {
          image_url: this.url,
          f2f_url: this.f2f_url,
          ingredients: this.ingredients,
          publisher: this.publisher,
          publisher_url: this.publisher_url,
          social_rank: this.social_rank,
          source_url: this.source_url,
          title: this.title
        } = res.data.recipe
      );
    } catch (error) {
      console.error(error);
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const units = {
      tablespoons: {
        long: 'tablespoons',
        short: 'tbsp'
      },
      tablespoon: {
        long: 'tablespoon',
        short: 'tbsp'
      },
      ounce: {
        long: 'ounce',
        short: 'oz'
      },
      ounces: {
        long: 'ounces',
        short: 'oz'
      },
      teaspoon: {
        long: 'teaspoon',
        short: 'tsp'
      },
      teaspoons: {
        long: 'teaspoons',
        short: 'tsp'
      },
      cups: {
        long: 'cups',
        short: 'cup'
      },
      pounds: {
        long: 'pounds',
        short: 'pound'
      },
    };

    this.ingredients = this.ingredients.map(ingredient => {

      // 1 Uniform units
      Object.keys(units).forEach(unit => {
        ingredient = ingredient.toLowerCase().replace(units[unit].long, units[unit].short);
      });

      // 2 Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3 Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitsShortArray = Object.keys(units).map(unit => units[unit].short);
      const unitIndex = arrIng
        .findIndex(ingWord => unitsShortArray.includes(ingWord));
      let objIng;
      if (unitIndex > -1) {
        objIng = {
          count: 1,
          unit: '',
          ingredient
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is a unit
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        };
      } else if (unitIndex === -1) {
        objIng = {
          count: 1,
          unit: '',
          ingredient
        };
      }
      return ingredient;
    });
  }
}