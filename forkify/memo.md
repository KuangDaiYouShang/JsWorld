import & export

``` javascript
// -------import
import str from './views/searchViews';

//import {add, multiply, ID} from './models/Search';

import * as searchView from './models/Search';

console.log(`Using imported function ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3,5)}. ${str}`);

//-------export 
export default 'I am the default export';
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export const ID = 23;

```



## Use axios for http request

* npm install axios --save

* when we import external module from node_modules, we do not need to specify the path. Instead, specify the package name

  ``` javascript
  import axios from 'axios';
  ```

* Class defined in the model/Search.js and exported.

  ``` javascript
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
        console.log(recipes);
        this.result = recipes; //'this means global in the class.'
      } catch(error) {
        alert(error);
      }
    }
  }
  ```

  ## In javascript class, you do not need to define global variables if it is not in the constructor at the very beginning, because this.xxx will automatically define one once you use it.

# Application State

all the data in the current state at the current moment of our app, and we want all of them in one central place.

define the a new object state{} in the controller js and put the search object in that object.

``` javascript
const state = {};

const controllerSearch = async () => {
  //1) Get query from the view
  const query = 'pizza';

  if(query) {
    //2) New search object and store in the state
    state.search = new Search(query);
    console.log(search);

    //3) prepare UI for the result

    //4) do the search
    await state.search.getResults();//any async function will return a promise

    //5) render result to the UI
    console.log(state.search.result);
  }
}

document.querySelector('.search').addEventListener('submit', e=>{
  e.preventDefault(); //prevent default action of the button.
  controlSearch();

})
```

## Building the search view

* Advanced DOM manipulation techniques;
* How to use ES6 template string to render entire HTML components;
* How to create a loading spinner.

Its a good idea to store all the DOM elements in one base.js. 

``` javascript
export const elements = {
  searchInput : document.querySelector('.search__field'),
  searchForm : document.querySelector('.search');
}
```

* Use String template to insert html blocks

  ``` javascript
  const renderRecipe = el => {
    const markup = //This looks like React
    `
    <li>
        <a class="results__link results__link--active" href=${el.f2f_url}>
            <figure class="results__fig">
                <img src=${el.image_url} alt=${el.title}>
            </figure>
            <div class="results__data">
                <h4 class="results__name">${el.title}</h4>
                <p class="results__author">${el.publisher}</p>
            </div>
        </a>
    </li>
    `
    //insert beforeend to make a good sequence
    elements.searchList.insertAdjacentHTML('beforeend', markup);
  };
  ```

* Clear the child (all li under ul)

  ``` javascript
  export const clearResult = () => {
    elements.searchList.innerHTML = '';
  }
  ```


## What if the title is too long and we just want it to be one lined ?

* use Array.reduce(callback, start) , String.split() and Array.join()

  ``` javascript
  const limitTitle = (title, limit = 17) => {
     const newTitle = [];
     if(title.length > 17) {
       title.split(' ').reduce((acc, cur) => {
         if(acc + cur.length <= 17) {
           newTitle.push(cur);
         }
         return acc + cur.length; // this will be the new acc
       }, 0);
     }
     return '${newTitle.join(' ')} ...'; //join is the opposite of split
  }
  ```


## Render a loader while waiting for the result:

* Insert loader under the search result area: 

  ``` javascript
  export const renderLoader = parent => {
    const loader = `
      <div class="${elementStrings.loader}">
        <svg>
          <use href="img/icons.svg#icon-cw"></use>
        </svg>
      </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
  };
  ```

* The loader css is like :

  ``` css
  .loader {
    margin: 5rem auto;
    text-align: center; }
    .loader svg {
      height: 5.5rem;
      width: 5.5rem;
      fill: #F59A83;
      transform-origin: 44% 50%;
      animation: rotate 1.5s infinite linear; }
  
  @keyframes rotate {
    0% {
      transform: rotate(0); }
    100% {
      transform: rotate(360deg); } }
  
  ```

* Have to delete the loader after search result appear. Since the loader is not there before we click search button, we cant prepare the node before hand:

  ``` javascript
  export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
  };
  ```

## Implementing pagination:

* How to use .closest method for easier event handling

* How and why to use data-* attributes in HTML5

  ``` javascript
  export const displayRecipes = (recipes, page=1, resPerPage=5) => {
    //decide the start and end elements
    const start = page - 1;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe); //slice the array for page
      //insert html blocks
    renderButtons(page, recipes.length, resPerPage);
  }
  ```

* create button html block: 

  The data- attribute in html5 will be used for event listener later, BY

  ``` javascript
  const btn = e.target.closest('.btn-inline');
  const goToPage = parseInt(btn.dataset.goto, 10); //data-goto
  
  ```

  * button html block and string template

  ``` javascript
  const createButtons = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ?  page-1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page-1 : page + 1}</span>
    </button>
    `;
  ```

* classic three-way pattern of pages:

  compare the current page with the 1 and total pages

  ``` javascript
  const renderButtons = (page, numRes, resPerPage) => {
    const pages = Math.ceil(numRes / resPerPage);
    let button;
    if(page == 1 && pages > 1) {
      //next button
      button = createButtons(1, 'next');
    } else if (page > 1 && page < pages) {
      //prev and next button
      button = `${createButtons(page, 'prev')}
                ${createButtons(page, 'next')}`;
    } else if (page == pages && pages > 1) {
      //prev button
      button = createButtons(pages, 'prev');
    }
    elements.resultPages.insertAdjacentHTML('afterbegin', button);
  }
  ```

* Attach the event handler to the page button:

  where we add to if the button is not even there when the page is loaded.

  Actually, even if the button is added, we only want the data- attribute in the parent node.

  ### Use event delegation and Element.closest()

  Starting with the [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) itself, the `**closest()**` method traverses parents (heading toward the document root) of the [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) until it finds a node that matches the provided selectorString. Will return itself or the matching ancestor. If no such element exists, it returns `null`. 

  

  ``` javascript
  elements.searchRes.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);//10 means decimal, 2 means binary
        //have to clean out before
        searchView.clearResult();
        searchView.displayRecipes(state.search.result, goToPage);
    }
  })
  ```

  ## Build controller"

  * How to read data from the Page url
  * How to respond to the hashchange event
  * How to add the same event listener to multiple events

  ``` javascript
  ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
  ```

  * As previously implemented render recipe function , once we click one of the search result, the url will change : 

    href="#${el.recipe_id}"

    According to the recipe_id in the url , we can get the Recipe object done.

    ``` javascript
    const id = window.location.hash.replace('#', '');
    state.recipe = new Recipe(id);
    ```

  * Parse Ingredient

     Use two arrays to map the ingredients

    ``` javascript
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoon', 'teaspoons', 'cup', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const newIngredients = this.ingredients.map(el => {
          let ingredient = el.toLowerCase();
          unitsLong.forEach((unit, i) => {
            ingredient = ingredient.replace(unit, unitsShort[i]);
          });
    ```

    Use regular expression to remove Parenthesis 

    ``` javascript
    ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
    ```

    Array.findIndex(el => some condition) will return the index of that array which meets the condition

    eval() recognize a string as a java script code:

    ``` javascript
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
    ```

    

## To add multiple li tags under ul tag using string template.

##  Add other units to the unitsShorts array.



## Use Fractional library to make 1.5 -> 1  1/2

​	use the third party library : fractional

``` javascript
import { Fraction }  from 'fractional';

const formatCount = count => {
  if(count) {
    const newCount = Math.round((count * 10000) / 10000);
    const [int, dec] = newCount.toString().split('.').map(el => parseInt(el, 10));

    if(!dec) return int;
    if(int === 0) {
      const fr = new Fration(newCount);
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(newCount - int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }
  return '?';
};
```



## Use CSS selector to highlight the selected recipe

``` javascript
export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};
```

## Another way of implementing event delegation : .matches

* The button does not exist before the recipe is shown.

* There will be more buttons added to this area later.

* It could be some child tags clicked like svg

  ```html
          <button class="shopping__delete btn-tiny">
              <svg>
                  <use href="img/icons.svg#icon-circle-with-cross"></use>
              </svg>
          </button>
  ```

  

  ``` javascript
  elements.recipeArea.addEventListener('click', e => {
    //There will be more buttons added to this area later, so we cannot use closest here.
    //Instead, use match
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
       if(state.recipe.servings > 1) {
         state.recipe.updateServings('dec');
         recipeView.updateServingIngredients(state.recipe);
       }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingIngredients(state.recipe);
    }
  })
  ```

  ## How and why to create unique IDs using external package

  ``` 
  npm install uniqid
  
  import uniqueid from 'uniqid';
  
  id : uniqueid()
  ```

  

  ## Difference between Array.slice and Array.splice

  * Array.splice does not mutate the original array

  * Array.slice mutate the original array, and it doe not include the second index

    ```
    [2,4,8] splice(1,2) -> returns [4, 8], original array is [2]
    [2,4,8] slice(1,2) -> returns 4, original array is [2,4,8] 
    ```

  

  ## More uses cases for Array.findIndex and Array.find

  ``` javascript
    deleteItem(id) {
      const index = this.items.findIndex(el => el.id == id); //find the index
      this.items.splice(index, 1);
    }
  
    updateItem(id, newCount) {
      this.items.find(el => el.id == id).count = newCount; //find the item itself
    }
  ```

  

  ## data-xx-yy attribute and CSS selector

  ``` javascript
      <li class="shopping__item" data-itemid=${item.id}>
      
      const item = document.querySelector(`[date-itemid="${id}"]`);
      
      
      //handle delete item and update list items event
  elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    console.log(id);
    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
      //delete item from UI
      listView.deleteItem(id);
      //delete item from state
      state.list.deleteItem(id);
      console.log(state.list);
    }
  });
  ```

  ## little conclusion : 

  ```
  event => controller.eventHandler => controller function => [view, model]
  
  event delegetion: event added to the area , use matches to decide different actions.
  ```

  

  
