import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = 'f8aee65f0922e63ef4291313b991e82e';
    const url = 'https://www.food2fork.com/api/search';
    try {
      const res = await axios(`${proxy}${url}?key=${key}&q=${this.query}`);
      const recipes = res.data.recipes;
      this.result = recipes; //this means global varibal in the class.
    } catch(error) {
      alert(error);
    }
  }
}
