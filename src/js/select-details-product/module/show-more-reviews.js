'use strict';

import { createReview } from './create-review'; // Create Review
import { initIndexedDB, getReviewsBD } from '../../indexed-db'; // IndexedDB

export function showMoreReviews() {
  const btnShowReviews = document.querySelector('#reviews-more');
  const containerReviews = document.querySelector('.reviews__box');

  if (btnShowReviews) {
    btnShowReviews.addEventListener('click', () => {
      mainShowReviews(containerReviews);
    });
    btnShowReviews.addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        event.preventDefault();
        mainShowReviews(containerReviews);
      }
    });
  }
}

async function mainShowReviews(container) {
  try {
    const db = await initIndexedDB();
    const allReviews = await getReviewsBD(db);
    if (allReviews.length > 0) {
      allReviews.forEach(item => {
        createReview(item, container);
      });
    }
  } catch (error) {
    console.error('Error indexedBD:', error);
  }
}
