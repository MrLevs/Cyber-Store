'use strict';

export function createReview(objReview, container) {
  const article = document.createElement('article');
  const avatar = document.createElement('img');
  const divInner = document.createElement('div');

  const divBox = document.createElement('div');
  const divStars = document.createElement('div');
  const comment = document.createElement('p');
  const divImages = document.createElement('div');

  const name = document.createElement('h3');
  const date = document.createElement('time');

  article.className = 'review';

  avatar.className = 'review__img';
  avatar.alt = 'Avatar';
  avatar.src = '/images/user.webp';

  divInner.className = 'review__inner';
  divBox.className = 'review__box';
  divStars.className = 'review__stars';
  comment.className = 'review__comment';
  comment.textContent = objReview.comment;
  divImages.className = 'review__images';

  name.className = 'review__name';
  name.textContent = objReview.name;
  date.className = 'review__date';
  date.setAttribute('datetime', objReview.date);
  date.textContent = objReview.date;

  container.append(article);
}
