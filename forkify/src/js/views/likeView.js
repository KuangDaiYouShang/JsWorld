import { elements } from './base';

export const toggleButton = isLiked => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}

export const toggleLikeMenu = numLikes => {
  console.log(numLikes);
  elements.likeMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLikes = like => {
  const markup = `
    <li>
            <figure class="likes__fig">
            </figure>
            <div class="likes__data">
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
  `;

  elements.likesList.insertAdjacentHTML('beforeend', markup);
}

export const deleteLikes = id => {
  const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
  if(el) {
  }
}
