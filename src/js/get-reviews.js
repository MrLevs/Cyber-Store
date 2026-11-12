'use strict';

import { initIndexedDB, addReviewsBD, getReviewsBD } from './indexed-db'; // indexedDB

export let dataReviews = [];
let db = null;

export async function loadReviews() {
  db = await initIndexedDB();
  dataReviews = await getReviewsBD(db);
  return dataReviews;
}

export async function addNewReview(newReviewObj) {
  const id = await addReviewsBD(db);
  dataReviews.unshift({ ...newReviewObj, id });
}
