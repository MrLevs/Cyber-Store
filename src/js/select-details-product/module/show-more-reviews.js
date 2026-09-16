'use strict';

import { createReview } from './create-review'; // Create Review

export function showMoreReviews() {
  const btnShowReviews = document.querySelector('#reviews-more');
  const containerReviews = document.querySelector('.reviews__box');
  let allReviews = JSON.parse(localStorage.getItem('reviews'));

  if (btnShowReviews) {
    btnShowReviews.addEventListener('click', () => {
      console.log('click');
      allReviews.forEach(item => {
        createReview(item, containerReviews);
      });
    });
    btnShowReviews.addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        event.preventDefault();
        console.log('Enter');
      }
    });
  }
}
