import { elements } from './base';

export const getInput = () => elements.searchInput.value;

//clean the input
export const clearInput = () => {
  elements.searchInput.value = ''; //wrap here because we dont want to return anything.
};

//clean the results
export const clearResult = () => {
  elements.searchList.innerHTML = '';
  elements.resultPages.innerHTML = '';
}

//The following function takes the words of the title till the total length is 17
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
   return `${newTitle.join(' ')} ...`; //join is the opposite of split
}

const renderRecipe = el => {
  const markup = //This looks like React
  `
  <li>
      <a class="results__link results__link--active" href="#${el.recipe_id}">
          <figure class="results__fig">
              <img src="${el.image_url}" alt="${el.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitTitle(el.title)}</h4>
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

const createButtons = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ?  page-1 : page + 1}>
      <span>Page ${type === 'prev' ? page-1 : page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
  </button>
  `;

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

export const displayRecipes = (recipes, page=1, resPerPage=5) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe); //No need for el => in foreach, coz its automatically done.
  renderButtons(page, recipes.length, resPerPage);
}
