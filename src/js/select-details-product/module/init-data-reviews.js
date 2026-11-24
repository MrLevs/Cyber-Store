'use strict';

import { dataReviews, loadReviews } from '../../reviews-store'; // Get Reviews from IndexedDB
import { statRating } from './stat-rating/stat-rating'; // Show Rating Statistics
import { createStatReviews } from './stat-rating/create-stat-reviews'; // Create Stat Rating
import { rating } from './stat-rating/rating'; // Rating
import { showMoreReviews } from './show-more-reviews/show-more-reviews'; // Show More Reviews

export async function initDataReviews() {
  try {
    await loadReviews();
    const statRtng = statRating(dataReviews);
    rating(statRtng);
    createStatReviews(statRtng);
    showMoreReviews(dataReviews);
  } catch (error) {
    console.error('Error loading reviews:', error);
  }
}
