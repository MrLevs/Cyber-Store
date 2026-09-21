'use strict';

export function createIndexedDB() {
  let openIndexedDB = indexedDB.open('cyberStore', 1);

  openIndexedDB.onupgradeneeded = function (event) {
    let db = openIndexedDB.result;
    if (!db.objectStoreNames.contains('reviews')) {
      db.createObjectStore('reviews', { keyPath: 'id' });
    }

    let transaction = event.target.transaction;
    let review = transaction.objectStore('reviews');
    let comment = {
      id: 'js',
      price: 10,
      created: new Date(),
    };

    let requst = review.add(comment);

    requst.onsuccess = function () {
      console.log('comment add review', requst.result);
      console.log(requst);
    };

    requst.onerror = function () {
      console.log('Error', requst.error);
    };
    console.log('Upgrade IndexedDB');
  };

  openIndexedDB.onerror = function () {
    console.error('Error', openIndexedDB.error);
  };

  openIndexedDB.onsuccess = function () {
    let db = openIndexedDB.result;
    console.log(db);
    console.log(db.objectStoreNames);
    db.onversionchange = function () {
      db.close();
      alert('The database is outdated; please reload the page.');
    };
  };

  openIndexedDB.onblocked = function () {
    console.log('blocked DB');
  };

  // let deleteIndexedDB = indexedDB.deleteDatabase('cyberStore');
  // deleteIndexedDB.onsuccess = function () {
  //   console.log('delete success', deleteIndexedDB.result);
  // };
  // deleteIndexedDB.onerror = function () {
  //   console.log('delete error', deleteIndexedDB.error);
  // };
}
