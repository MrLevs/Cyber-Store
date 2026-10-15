'use strict';

import { mainShowReviews } from './module/main-show-reviews'; // Main Show Reviews

export function showMoreReviews() {
  const btnShowReviews = document.querySelector('#reviews-more');
  const containerReviews = document.querySelector('.reviews__box');
  const showNextReviews = mainShowReviews(containerReviews);

  if (btnShowReviews) {
    btnShowReviews.addEventListener('click', async () => {
      const isComplete = await showNextReviews();
      if (isComplete) {
        btnShowReviews.textContent = 'Collapse Reviews';
      }
    });
    btnShowReviews.addEventListener('keydown', async event => {
      if (event.code === 'Enter') {
        event.preventDefault();
        const isComplete = await showNextReviews();
        if (isComplete) {
          btnShowReviews.textContent = 'Collapse Reviews';
        }
      }
    }); // Create-review.js URL img, УВЕЛИЧИТЬ КАРТИНКИ ПО КЛИКУ!
  }
}
