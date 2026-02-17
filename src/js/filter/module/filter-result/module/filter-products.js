'use strict';

export function filterProducts(array, categoryProduct, arrayFilters, productFilter) {
  array.forEach(item => {
    if (item.title === categoryProduct && item.brand) {
      arrayFilters.forEach(valueFilters => {
        switch (valueFilters) {
          case item.brand:
            productFilter.push(item);
            break;
          case '2499':
            batteryFiltersPush(item, valueFilters);
            break;
          case '2500-3999':
            batteryFiltersPush(item, valueFilters);
            break;
          case '4000-4499':
            batteryFiltersPush(item, valueFilters);
            break;
          case '4500-4999':
            batteryFiltersPush(item, valueFilters);
            break;
          case '5000-5999':
            batteryFiltersPush(item, valueFilters);
            break;
          case '6000':
            batteryFiltersPush(item, valueFilters);
            break;
          case item.screen:
            productFilter.push(item);
            break;
          case '6.09':
            diagonalFiltersPush(item, valueFilters);
            break;
          case '6.1-6.29':
            diagonalFiltersPush(item, valueFilters);
            break;
          case '6.3-6.49':
            diagonalFiltersPush(item, valueFilters);
            break;
          case '6.5-6.59':
            diagonalFiltersPush(item, valueFilters);
            break;
          case '6.6-6.79':
            diagonalFiltersPush(item, valueFilters);
            break;
          case '6.8':
            diagonalFiltersPush(item, valueFilters);
            break;
          case item.protection:
            productFilter.push(item);
            break;
          case item.memory:
            productFilter.push(item);
            break;
        }
      });
    }
  });

  function batteryFiltersPush(item, valueFilters) {
    let valueNum = valueFilters.split('-');

    if (valueNum.length == 1) {
      if (valueNum[0] === '2499') {
        if (+item.battery <= +valueFilters) {
          productFilter.push(item);
        }
      } else {
        if (+item.battery >= +valueFilters) {
          productFilter.push(item);
        }
      }
    } else {
      if (+valueNum[0] <= +item.battery && +item.battery <= +valueNum[1]) {
        productFilter.push(item);
      }
    }
  }

  function diagonalFiltersPush(item, valueFilters) {
    let valueNum = valueFilters.split('-');

    if (valueNum.length == 1) {
      if (valueNum[0] === '6.09') {
        if (+item.diagonal <= +valueFilters) {
          productFilter.push(item);
        }
      } else {
        if (+item.diagonal >= +valueFilters) {
          productFilter.push(item);
        }
      }
    } else {
      if (+valueNum[0] <= +item.diagonal && +item.diagonal <= +valueNum[1]) {
        productFilter.push(item);
      }
    }
  }
}
