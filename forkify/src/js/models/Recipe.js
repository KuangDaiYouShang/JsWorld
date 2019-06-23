import { resDetail } from '../views/mock';
export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = 'f8aee65f0922e63ef4291313b991e82e';
    const url = 'https://www.food2fork.com/api/search';
    try {
      //const res = await axios(`${proxy}${url}?key=${key}&rId=${this.id}`);
      //Temporary use mock here because of network issues
      const res = resDetail;
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
      console.log(res);
    } catch(error) {
      console.log(error);
    }
  }

  calcTime() {
    //Assuming that we need 15 min for each 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    //uniform units
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoon', 'teaspoons', 'cup', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const newIngredients = this.ingredients.map(el => {
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });
      //remove parenthes
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      //parse ingredients
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

      let objIng;
      if(unitIndex > -1) {
        //There is a unit
        // E.g. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if(arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+')); //deal with 1-1/2
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient : arrIng.slice(unitIndex + 1).join(' ')
        };

      } else if (parseInt(arrIng[0], 10)) {
        //There is no unit but first element is a number
        objIng = {
          count : parseInt(arrIng[0], 10),
          unit : '',
          ingredient: arrIng.slice(1).join(' ')
        };
      } else if (unitIndex === -1) {
        //There is no unit, no number
        objIng = {
          count : 1,
          unit : '',
          ingredient
        }
      }
      return objIng;
    });
    this.ingredients = newIngredients;
  }
}
