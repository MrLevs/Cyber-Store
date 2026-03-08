'use strict';

export function filterProducts(array, categoryProduct, arrayFilters, productFilter) {
  let priceValue = [];
  array.forEach(item => {
    if (item.title === categoryProduct && item.brand) {
      arrayFilters.forEach(valueFilters => {
        switch (valueFilters) {
          case item.brand:
            productFilter.push(item);
            break;
          case '2499':
            batteryFiltersPush(item, valueFilters, productFilter);
            break;
          case '2500-3999':
            batteryFiltersPush(item, valueFilters, productFilter);
            break;
          case '4000-4499':
            batteryFiltersPush(item, valueFilters, productFilter);
            break;
          case '4500-4999':
            batteryFiltersPush(item, valueFilters, productFilter);
            break;
          case '5000-5999':
            batteryFiltersPush(item, valueFilters, productFilter);
            break;
          case '6000':
            batteryFiltersPush(item, valueFilters, productFilter);
            break;
          case item.screen:
            productFilter.push(item);
            break;
          case '6.09':
            diagonalFiltersPush(item, valueFilters, productFilter);
            break;
          case '6.1-6.29':
            diagonalFiltersPush(item, valueFilters, productFilter);
            break;
          case '6.3-6.49':
            diagonalFiltersPush(item, valueFilters, productFilter);
            break;
          case '6.5-6.59':
            diagonalFiltersPush(item, valueFilters, productFilter);
            break;
          case '6.6-6.79':
            diagonalFiltersPush(item, valueFilters, productFilter);
            break;
          case '6.8':
            diagonalFiltersPush(item, valueFilters, productFilter);
            break;
          case item.protection:
            productFilter.push(item);
            break;
          case item.memory:
            productFilter.push(item);
            break;
        }
        if (valueFilters.includes('min') || valueFilters.includes('max')) {
          if (!priceValue.includes(valueFilters)) {
            priceValue.push(valueFilters);
          }
        }
      });
    }
  });

  if (priceValue.length !== 0) {
    let minPrice = priceValue.filter(item => item.includes('min')).map(item => item.replace('min', ''));
    let maxPrice = priceValue.filter(item => item.includes('max')).map(item => item.replace('max', ''));

    array.forEach(item => {
      if (minPrice.length === 0) {
        if (parseInt(item.price, 10) <= parseInt(maxPrice[0], 10)) {
          productFilter.push(item);
        }
      } else if (maxPrice.length === 0) {
        if (parseInt(item.price, 10) >= parseInt(minPrice[0], 10)) {
          productFilter.push(item);
        }
      } else {
        if (
          parseInt(item.price, 10) >= parseInt(minPrice[0], 10) &&
          parseInt(item.price, 10) <= parseInt(maxPrice[0], 10)
        ) {
          productFilter.push(item);
        }
      }
    });
  }
}

function batteryFiltersPush(item, valueFilters, productFilter) {
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

function diagonalFiltersPush(item, valueFilters, productFilter) {
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
