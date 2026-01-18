'use strict';

import { productFiltersMap } from './module/product-filters-map';

export function filterResult(arrayData, arrayFilters) {
  let categoryProduct = 'smartphones';
  let brandFilter = [];
  let productFilter = [];
  console.log(arrayFilters);
  if (arrayFilters.length === 0) {
    arrayData.forEach(item => {
      if (item.title === categoryProduct && item.brand) {
        productFilter.push(item);
      }
    });
  } else {
    filterProducts(arrayData);
  }

  let dataProduct = productFiltersMap(productFilter);
  return dataProduct;

  function filterProducts(array) {
    array.forEach(item => {
      if (item.title === categoryProduct && item.brand) {
        arrayFilters.forEach(valueFilters => {
          switch (valueFilters) {
            case item.brand:
              brandFilter.push(item);
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
              if (productFilter.includes(item)) {
                if (!brandFilter.includes(item)) {
                  brandFilter.push(item);
                }
              } else {
                productFilter.push(item);
              }
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
              if (!productFilter.includes(item)) {
                productFilter.push(item);
              }
              break;
            case item.memory:
              if (!productFilter.includes(item)) {
                productFilter.push(item);
              }
          }
        });
      }
    });

    if (productFilter.length === 0) {
      productFilter = brandFilter;
    } else {
      if (brandFilter.length !== 0) {
        let s = brandFilter.filter(item => productFilter.includes(item));
        productFilter = s;
        console.log('Product', s);
      }
    }
    console.log(productFilter);
  }

  function batteryFiltersPush(item, valueFilters) {
    let valueNum = valueFilters.split('-');

    if (valueNum.length == 1) {
      if (valueNum[0] === '2499') {
        if (+item.battery <= +valueFilters) {
          if (!productFilter.includes(item)) {
            productFilter.push(item);
          }
        }
      } else {
        if (+item.battery >= +valueFilters) {
          if (!productFilter.includes(item)) {
            productFilter.push(item);
          }
        }
      }
    } else {
      if (+valueNum[0] <= +item.battery && +item.battery <= +valueNum[1]) {
        if (!productFilter.includes(item)) {
          productFilter.push(item);
        }
      }
    }
  }

  function diagonalFiltersPush(item, valueFilters) {
    let valueNum = valueFilters.split('-');

    if (valueNum.length == 1) {
      if (valueNum[0] === '6.09') {
        if (+item.diagonal <= +valueFilters) {
          if (!productFilter.includes(item)) {
            productFilter.push(item);
          }
        }
      } else {
        if (+item.diagonal >= +valueFilters) {
          if (!productFilter.includes(item)) {
            productFilter.push(item);
          }
        }
      }
    } else {
      if (+valueNum[0] <= +item.diagonal && +item.diagonal <= +valueNum[1]) {
        if (!productFilter.includes(item)) {
          productFilter.push(item);
        }
      }
    }
  }
}
