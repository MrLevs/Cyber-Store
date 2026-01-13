'use strict';

import { productFiltersMap } from './module/product-filters-map';

export function filterResult(arrayData, arrayFilters) {
  let categoryProduct = 'smartphones';
  let productFilter = [];
  let productFilterAll = [];
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

  if (productFilterAll.length === 0) {
    console.log(
      arrayFilters.forEach(elem => {
        arrayData.filter(item => {
          return item.brand === elem;
        });
      }),
    );
    console.log(productFilter);
    let dataProduct = productFiltersMap(productFilter);
    return dataProduct;
  } else {
    let dataProduct = productFiltersMap(productFilterAll);
    return dataProduct;
  }

  function filterProducts(array) {
    array.forEach(item => {
      if (item.title === categoryProduct) {
        arrayFilters.forEach(filtersValue => {
          Object.values(item);
          for (let key in item) {
            switch (filtersValue) {
              case item[key]:
                if (!productFilter.includes(item)) {
                  productFilter.push(item);
                }
                break;
              case '2499':
                arrayPush(key, filtersValue, item);
                break;
              case '2500-3999':
                arrayPush(key, filtersValue, item);
                break;
              case '4000-4499':
                arrayPush(key, filtersValue, item);
                break;
              case '4500-4999':
                arrayPush(key, filtersValue, item);
                break;
              case '5000-5999':
                arrayPush(key, filtersValue, item);
                break;
              case '6000':
                arrayPush(key, filtersValue, item);
                break;
              case '6.09':
                arrayPush(key, filtersValue, item);
                break;
              case '6.1-6.29':
                arrayPush(key, filtersValue, item);
                break;
              case '6.3-6.49':
                arrayPush(key, filtersValue, item);
                break;
              case '6.5-6.59':
                arrayPush(key, filtersValue, item);
                break;
              case '6.6-6.79':
                arrayPush(key, filtersValue, item);
                break;
              case '6.8':
                arrayPush(key, filtersValue, item);
                break;
            }
          }
        });
      }
    });
    console.log(productFilter);
    console.log(productFilterAll);
  }

  function arrayPush(key, filtersValue, item) {
    let filtersValueValue = filtersValue.split('-');
    if (key === 'battery') {
      if (filtersValueValue.length == 1) {
        if (filtersValueValue[0] === '2499') {
          if (+item[key] <= +filtersValue) {
            if (!productFilter.includes(item)) {
              productFilter.push(item);
            } else {
              if (!productFilterAll.includes(item)) {
                productFilterAll.push(item);
              }
            }
          }
        } else {
          if (+item[key] >= +filtersValue) {
            if (!productFilter.includes(item)) {
              productFilter.push(item);
            } else {
              if (!productFilterAll.includes(item)) {
                productFilterAll.push(item);
              }
            }
          }
        }
      } else {
        if (+filtersValueValue[0] <= +item[key] && +item[key] <= +filtersValueValue[1]) {
          if (!productFilter.includes(item)) {
            productFilter.push(item);
          } else {
            if (!productFilterAll.includes(item)) {
              productFilterAll.push(item);
            }
          }
        }
      }
    } else {
      if (filtersValueValue.length == 1) {
        if (filtersValueValue[0] === '6.09') {
          if (+item[key] <= +filtersValue) {
            if (!productFilter.includes(item)) {
              productFilter.push(item);
            } else {
              if (!productFilterAll.includes(item)) {
                productFilterAll.push(item);
              }
            }
          }
        } else {
          if (+item[key] >= +filtersValue) {
            if (!productFilter.includes(item)) {
              productFilter.push(item);
            } else {
              if (!productFilterAll.includes(item)) {
                productFilterAll.push(item);
              }
            }
          }
        }
      } else {
        if (+filtersValueValue[0] <= +item[key] && +item[key] <= +filtersValueValue[1]) {
          if (!productFilter.includes(item)) {
            productFilter.push(item);
          } else {
            if (!productFilterAll.includes(item)) {
              productFilterAll.push(item);
            }
          }
        }
      }
    }
  }
}
