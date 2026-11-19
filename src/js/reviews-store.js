'use strict';

import { initIndexedDB, addReviewsBD, getReviewsBD } from './indexed-db'; // indexedDB

export let dataReviews = [];
let db = null;

async function ensureDB() {
  if (!db) {
    db = await initIndexedDB();
  }
  return db;
}

export async function loadReviews() {
  try {
    const database = await ensureDB();
    const reviews = await getReviewsBD(database);

    dataReviews.length = 0;
    dataReviews.push(...reviews);
  } catch (error) {
    console.error('Error loading reviews:', error);
    throw error;
  }
}

export async function addNewReview(newReviewObj) {
  try {
    const database = await ensureDB();
    const id = await addReviewsBD(database, newReviewObj);
    const newReview = { ...newReviewObj, id };
    dataReviews.unshift(newReview);
  } catch (error) {
    console.error('Error adding new review:', error);
    throw error;
  }
}
