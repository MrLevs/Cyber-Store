'use strict';

import { initIndexedDB, getReviewsBD } from '../../../../indexed-db'; // IndexedDB
import { createReview } from './create-review'; // Create Review

export function mainShowReviews(container, elemSize = 3) {
  let allReviews = null;
  let currentIndex = 0;
  let isLoading = false;

  return async function loadReviews() {
    if (isLoading) return false;
    try {
      if (allReviews === null) {
        isLoading = true;
        const db = await initIndexedDB();
        const data = await getReviewsBD(db);
        allReviews = Array.isArray(data) ? data : [];
        isLoading = false;
      }

      if (currentIndex >= allReviews.length) {
        console.log('Reviews complete!');
        return;
      }

      const nextChunk = allReviews.slice(currentIndex, currentIndex + elemSize);
      nextChunk.forEach(item => {
        createReview(item, container);
      });
      currentIndex += elemSize;
      return currentIndex >= allReviews.length;
    } catch (error) {
      isLoading = false;
      console.error('Error indexedDB:', error);
      return false;
    }
  };
}
