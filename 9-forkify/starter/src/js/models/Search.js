import axios from 'axios';
import { key, foodUrl } from './../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }
  async  getResults() {
    try {
      const response = await axios(`${foodUrl}/api/search?key=${key}&q=${this.query}`);
      if (response.data.error) {
        console.error(response.data.error);
      } else {
        this.result = response.data.recipes;
      }
    } catch (e) {
      console.error(e);
    }
  }
}