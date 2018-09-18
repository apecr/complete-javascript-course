import axios from 'axios';

const key = '4123db471815928653437ec47bf2744b';

export default class Search {
  constructor(query) {
    this.query = query;
  }
  async  getResults() {
    try {
      const response = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.result = response.data.recipes;
    } catch (e) {
      console.error(e);
    }
  }
}