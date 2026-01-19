'use strict';

import { productFiltersMap } from './module/product-filters-map';

export function filterResult(arrayData, arrayFilters) {
  let categoryProduct = 'smartphones';
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

  let product = productFilter.reduce((acc, i) => {
    if (Object.prototype.hasOwnProperty.call(acc, JSON.stringify(i))) {
      console.log(888);
      acc[JSON.stringify(i)] += 1;
    } else {
      acc[JSON.stringify(i)] = 1;
    }
    return acc;
  }, {});

  const getMaxKey = obj => {
    // ищем максимальное значение
    const maxValue = Math.max.apply(null, Object.values(obj)); /// сократить getMaxKey, преобразовать в filter()!!!
    // фильтруем по максимальному значению массив ключей
    return Object.keys(product).filter(k => product[k] === maxValue);
  };

  let productKey = getMaxKey(product).map(item => {
    return JSON.parse(item);
  });
  console.log(productKey);

  // let dataProduct = productFiltersMap(productFilter); было изначально
  let dataProduct = productFiltersMap(productKey);
  return dataProduct;

  function filterProducts(array) {
    // let xxx = [];
    // arrayFilters.forEach(item => {
    //   let yyy = array.reduce((acc, i, index) => {
    //     if (Object.values(i).includes(item)) {
    //       console.log(9999);
    //       i = index;
    //       if (acc.hasOwnProperty(i)) {
    //         acc[i] += 1;
    //       } else {
    //         acc[i] = 1;
    //       }
    //     }
    //     return acc;
    //   }, {});
    //   xxx.push(yyy);
    // });
    // let xxx = array.filter(item => {
    //   return item.brand === 'apple' && item.battery === '2000';

    // });
    // console.log(xxx);
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
    console.log(productFilter);
  }

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
