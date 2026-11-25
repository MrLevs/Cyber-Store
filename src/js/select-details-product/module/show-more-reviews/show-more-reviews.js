'use strict';

import { mainShowReviews } from './module/main-show-reviews'; // Main Show Reviews
import { createReview } from './module/create-review'; // Create Review

const INITIAL_COUNT = 3;

export function showMoreReviews(arrayDataReviews) {
  const btnShowReviews = document.querySelector('#reviews-more');
  const containerReviews = document.querySelector('.reviews__box');

  if (!btnShowReviews || !containerReviews) return;

  const firstReviews = arrayDataReviews.slice(0, INITIAL_COUNT);
  firstReviews.forEach(item => {
    createReview(item, containerReviews);
  });

  const remainingReviews = arrayDataReviews.slice(INITIAL_COUNT);

  if (remainingReviews.length === 0) {
    btnShowReviews.style.display = 'none';
    return;
  }

  const initialReviewsCount = containerReviews.children.length;
  const { loadReviews, collapseReviews } = mainShowReviews(remainingReviews, containerReviews);

  let isExpanded = false;

  btnShowReviews.addEventListener('click', () => {
    if (isExpanded) {
      collapseReviews(initialReviewsCount);
      btnShowReviews.textContent = 'View More';
      isExpanded = false;
    } else {
      const isComplete = loadReviews();
      if (isComplete) {
        btnShowReviews.textContent = 'Collapse Reviews';
        isExpanded = true;
      }
    }
  });
}
