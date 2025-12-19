'use strict';

export function countSelectedProducts(elem, array) {
  elem.innerHTML = '';
  elem.append(array.length);
}

export function createCountsFilters(elem, array) {
  elem.forEach(item => {
    item.innerHTML = '';
    switch (item.dataset.brand) {
      case 'apple':
        loopFilters(item);
        break;
      case 'samsung':
        loopFilters(item);
        break;
      case 'xiaomi':
        loopFilters(item);
        break;
      case 'poco':
        loopFilters(item);
        break;
      case 'oppo':
        loopFilters(item);
        break;
      case 'honor':
        loopFilters(item);
        break;
      case 'motorola':
        loopFilters(item);
        break;
      case 'nokia':
        loopFilters(item);
        break;
      case 'realme':
        loopFilters(item);
        break;
    }
  });

  function loopFilters(item) {
    let arrayFiltersProducts = array.filter(
      items =>
        items.brand ===
        item.dataset.brand
          .split(' ')
          .map(word => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
          .join(' '),
    );

    item.innerHTML = arrayFiltersProducts.length;
  }
}
