import axios from 'axios';
import {key, foodUrl} from './../config';

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
}