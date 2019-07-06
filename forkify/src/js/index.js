import Search from './models/Search';
import { elements, elementStrings, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchViews'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import List from './models/List';
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
    //clear recipe
    recipeView.clearRecipe();
    //prepare UI for changes
    renderLoader(elements.recipeArea);
    //hightlight the recipe
    if(state.search) searchView.highlightSelected(id);
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
      clearLoader();
      console.log(state.recipe);
      console.log('revipe View...');
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      alert('Error processing recipe!');
    }
  }
};

//list controller
const controList = recipe => {
  console.log(state);
  if(!state.list) state.list = new List();
  recipe.ingredients.forEach(e => {
    const item = state.list.addItem(e.count, e.unit, e.ingredient);
    listView.renderItem(item);
  })
};

//handle delete item and update list items event
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;
  console.log(id);
  if(e.target.matches('.shopping__delete, .shopping__delete *')) {
    //delete item from UI
    listView.deleteItem(id);
    //delete item from state
    state.list.deleteItem(id);
  } else if (e.target.matches('.shopping__count-value')) {
    const newCount = parseFloat(e.target.value, 10);
    state.list.updateItem(id, newCount);
    console.log(state.list);
  }
});

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

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
  } else if (e.target.matches('.recipe__btn, .recipe__btn--add *')) {
      controList(state.recipe);
  }
})
