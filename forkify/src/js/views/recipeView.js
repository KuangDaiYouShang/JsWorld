import { elements } from './base';
import { Fraction }  from 'fractional';

export const clearRecipe = () => {
    elements.recipeArea.innerHTML = '';
};

const createIngredients = objIngredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
              </svg>
                <div class="recipe__count">${objIngredient.count}</div>
                  <div class="recipe__ingredient">
            <span class="recipe__unit">${objIngredient.unit}</span>
              ${objIngredient.ingredient}
                </div>
    </li>
`;


const formatCount = count => {
  if(count) {
    const newCount = count;
    const [int, dec] = newCount.toString().split('.').map(el => parseInt(el, 10));
    console.log([int, dec]);
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

export const renderRecipe = recipe => {
  const markup = `
  <figure class="recipe__fig">
      <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
          <span>${recipe.title}</span>
      </h1>
  </figure>
  <div class="recipe__details">
      <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="img/icons.svg#icon-stopwatch"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
          <span class="recipe__info-text"> minutes</span>
      </div>
      <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="img/icons.svg#icon-man"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
          <span class="recipe__info-text"> servings</span>

          <div class="recipe__info-buttons">
              <button class="btn-tiny">
                  <svg>
                      <use href="img/icons.svg#icon-circle-with-minus"></use>
                  </svg>
              </button>
              <button class="btn-tiny">
                  <svg>
                      <use href="img/icons.svg#icon-circle-with-plus"></use>
                  </svg>
              </button>
          </div>

      </div>
      <button class="recipe__love">
          <svg class="header__likes">
              <use href="img/icons.svg#icon-heart-outlined"></use>
          </svg>
      </button>
  </div>

  <div class="recipe__ingredients">
      <ul class="recipe__ingredient-list">
        ${recipe.ingredients.map(ing => createIngredients(ing)).join('')}
      </ul>
      <button class="btn-small recipe__btn">
          <svg class="search__icon">
              <use href="img/icons.svg#icon-shopping-cart"></use>
          </svg>
          <span>Add to shopping list</span>
      </button>
  </div>
  <div class="recipe__directions">
      <h2 class="heading-2">How to cook it</h2>
      <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
      </p>
      <a class="btn-small recipe__btn" href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/" target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-right"></use>
          </svg>
      </a>
  </div>
  `;
  elements.recipeArea.insertAdjacentHTML('afterbegin', markup);
}