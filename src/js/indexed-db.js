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

    openIndexedDB.onsuccess = event => {
      const db = event.target.result;

      db.onversionchange = () => {
        db.close();
        alert('The database is outdated; please reload the page.');
        window.location.reload();
      };
      resolve(db);
    };

    openIndexedDB.onerror = event => reject(new Error('Error open IndexedDB: ' + event.target.error));
    openIndexedDB.onblocked = () =>
      console.warn('The IndexedDB update is blocked by another tab. Close the other application tabs.');
  });
}

export function addReviewsBD(db, objReview) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('reviews', 'readwrite');
    const storage = transaction.objectStore('reviews');
    const request = storage.add(objReview);
    let result;

    request.onsuccess = () => {
      result = request.result;
    };

    transaction.oncomplete = () => resolve(result);
    transaction.onerror = () => reject(new Error(`Transaction error: ${transaction.error}`));
  });
}

export function getReviewsBD(db) {
  return new Promise((resolve, reject) => {
    if (!db.objectStoreNames.contains('reviews')) {
      return reject(new Error("Object store 'reviews' does not exist."));
    }

    try {
      const transaction = db.transaction('reviews', 'readonly');
      const reviews = transaction.objectStore('reviews');
      const getRequest = reviews.openCursor(null, 'prev');
      const result = [];

      getRequest.onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
          result.push(cursor.value);
          cursor.continue();
        } else {
          resolve(result);
        }
      };
      getRequest.onerror = () =>
        reject(new Error(`Error getting all reviews: ${getRequest.error?.message || getRequest.error}`));

      transaction.onerror = () =>
        reject(new Error(`Transaction error: ${transaction.error?.message || transaction.error}`));
    } catch (error) {
      reject(error);
    }
  });
}
