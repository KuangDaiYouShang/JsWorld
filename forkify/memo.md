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

  