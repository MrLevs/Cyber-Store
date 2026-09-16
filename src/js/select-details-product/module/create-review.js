'use strict';

export function createReview(objReview, container) {
  const article = document.createElement('article');
  const avatar = document.createElement('img');
  const divInner = document.createElement('div');
  const fullName = `${objReview.name} ${objReview.surname}`;

  const divBox = document.createElement('div');
  const divStars = document.createElement('div');
  const comment = document.createElement('p');
  const divImages = document.createElement('div');

  const name = document.createElement('h3');
  const date = document.createElement('time');

  for (let i = 0; i < 5; i++) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    svg.setAttribute('class', 'review__svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');
    use.setAttribute('href', '/images/sprite-icon.svg#star');

    if (i < parseInt(objReview.rating, 10)) {
      svg.classList.add('review__svg_active');
    }

    svg.append(use);
    divStars.append(svg);
  }

  // if (objReview.file) {
  //   console.log(objReview.file);
  //   for (let i = 0; i < 2; i++) {
  //     const img = document.createElement('img');
  //     img.className = 'review__image';
  //     img.src = objReview.file;
  //     img.alt = 'review image';

  //     divImages.append(img);
  //   }
  // }
  // Send-comment.js заменить localStorage на IndexedDB и проверить как сохраняются файлы userReview.file(objReview.file) доработать create-review.js!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
  name.textContent = fullName;
  date.className = 'review__date';
  date.setAttribute('datetime', objReview.date.fullDate);
  date.textContent = objReview.date.fullDate;

  divBox.append(name, date);
  divInner.append(divBox, divStars, comment, divImages);
  article.append(avatar, divInner);
  container.append(article);
}
