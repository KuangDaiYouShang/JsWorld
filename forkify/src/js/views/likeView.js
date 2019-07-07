import { elements } from './base';

export const toggleButton = isLiked => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}

export const toggleLikeMenu = numLikes => {
  console.log(numLikes);
  elements.likeMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}
