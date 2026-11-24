'use strict';

import { createReview } from './create-review'; // Create Review

export function mainShowReviews(arrayDataReviews, container, elemSize = 3) {
  let currentIndex = 0;
  let createdImgUrls = [];

  function loadReviews() {
    const nextChunk = arrayDataReviews.slice(currentIndex, currentIndex + elemSize);

    nextChunk.forEach(item => {
      const urls = createReview(item, container);
      if (Array.isArray(urls)) {
        createdImgUrls.push(...urls);
      }
    });

    currentIndex += elemSize;
    return currentIndex >= arrayDataReviews.length;
  }

  function collapseReviews(initialCount = 0) {
    createdImgUrls.forEach(item => URL.revokeObjectURL(item));
    createdImgUrls.length = 0;

    while (container.children.length > initialCount) {
      container.lastElementChild.remove();
    }

    currentIndex = 0;
  }

  return { loadReviews, collapseReviews };
}
