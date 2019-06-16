import Search from './models/Search';
import { elements } from './views/base';
import * as searchView from './views/searchViews'

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

    //4) do the search
    await state.search.getResults();//any async function will return a promise

    //5) render result to the UI
    searchView.displayRecipes(state.search.result);
  }
}

document.querySelector('.search').addEventListener('submit', e=>{
  e.preventDefault(); //prevent default action of the button.
  controlSearch();

})
