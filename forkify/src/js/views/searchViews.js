import { elements } from './base';

export const getInput = () => elements.searchInput.value;

//clean the input
export const clearInput = () => {
  elements.searchInput.value = ''; //wrap here because we dont want to return anything.
};

//clean the results
export const clearResult = () => {
  elements.searchList.innerHTML = '';
}

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
/*
structure of recipe:
f2f_url: "http://food2fork.com/view/47746"
image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg"
publisher: "101 Cookbooks"
publisher_url: "http://www.101cookbooks.com"
recipe_id: "47746"
social_rank: 100
source_url: "http://www.101cookbooks.com/archives/001199.html"
title: "Best Pizza Dough Ever"
*/

export const displayRecipes = recipes => {
  recipes.forEach(renderRecipe); //No need for el => in foreach, coz its automatically done.
}
