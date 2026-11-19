'use strict';

import { dataReviews, loadReviews } from '../../reviews-store'; // Get Reviews from IndexedDB
import { statRating } from './stat-rating'; // Show Rating Statistics
import { createStatReviews } from './stat-rating/create-stat-reviews'; // Create Stat Rating
import { rating } from './stat-rating/rating'; // Rating

export async function initDataReviews() {
  try {
    await loadReviews();
    const statRtng = statRating(dataReviews);
    rating(statRtng);
    createStatReviews(statRtng);
  } catch (error) {
    console.error('Error loading reviews:', error);
  }
}
