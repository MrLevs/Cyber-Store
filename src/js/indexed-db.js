'use strict';

export function initIndexedDB() {
  return new Promise((resolve, reject) => {
    const openIndexedDB = indexedDB.open('cyberStore', 1);

    openIndexedDB.onupgradeneeded = event => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('reviews')) {
        const storage = db.createObjectStore('reviews', { keyPath: 'id', autoIncrement: true });

        storage.createIndex('ratingIdx', 'rating', { unique: false });
      }
    };

    openIndexedDB.onsuccess = event => resolve(event.target.result);
    openIndexedDB.onerror = event => reject('Error open IndexedBD: ' + event.target.error);
  });
}

export function addReviewsBD(db, objReview) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('reviews', 'readwrite');
    const storage = transaction.objectStore('reviews');
    const requst = storage.add(objReview);

    requst.onsuccess = () => resolve(requst.result);
    requst.onerror = () => reject('Error add Review: ' + requst.error);
  });
}

export function getReviewsBD(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('reviews', 'readonly');
    const reviews = transaction.objectStore('reviews');
    const getRequest = reviews.getAll();

    getRequest.onsuccess = () => resolve(getRequest.result);
    getRequest.onerror = () => reject('Error get All Reviews: ' + getRequest.error);
  });
}
