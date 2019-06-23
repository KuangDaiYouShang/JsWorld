import Search from './models/Search';
import { elements, elementStrings, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchViews'
import Recipe from './models/Recipe';

/** Global state of the app
 *- Search Object
 *- Current recipe object
 *- Shipping list object
 *- Liked recipes
*/

const state = {};

const controlSearch = async () => {
  //1) Get query from the view
  const query = searchView.getInput();

  if(query) {
    //2) New search object and store in the state
    state.search = new Search(query);
    console.log(state.search);

    //3) prepare UI for the result
    searchView.clearInput();
    searchView.clearResult();
    renderLoader(elements.searchRes);

    //4) do the search
    await state.search.getResults();//any async function will return a promise

    //5) render result to the UI
    clearLoader();
    searchView.displayRecipes(state.search.result);
  }
}

document.querySelector('.search').addEventListener('submit', e=>{
  e.preventDefault(); //prevent default action of the button.
  controlSearch();

});

//use closest method to get the specific node
elements.searchRes.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if(btn) {
      const goToPage = parseInt(btn.dataset.goto, 10);//10 means decimal, 2 means binary
      //have to clean out before
      searchView.clearResult();
      searchView.displayRecipes(state.search.result, goToPage);
  }
})

const r = new Recipe('46956');
r.getRecipe();

/**
* RECIPE CONTROLLER
*/
const controlRecipe = async () => {
  //Get ID from url
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if(id) {
    //prepare UI for changes

    //Create new recipe object
    state.recipe = new Recipe(id);
    //for testing
    window.r = state.recipe;

    try {
      // Get recipe data
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      //calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //render recipe
      console.log(state.recipe);
    } catch (err) {
      alert('Error processing recipe!');
    }
  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
