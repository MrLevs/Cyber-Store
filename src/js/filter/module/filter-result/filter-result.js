'use strict';

import { productFiltersMap } from './module/product-filters-map';

export function filterResult(arrayData, arrayFilters) {
  let categoryProduct = 'smartphones';
  let filtersProduct = [];
  let filtersProductAll = [];
  console.log(arrayFilters);
  if (arrayFilters.length === 0) {
    arrayData.forEach(item => {
      if (item.title === categoryProduct && item.brand) {
        filtersProduct.push(item);
      }
    });
  } else {
    filterProducts(arrayData);
  }

  if (filtersProductAll.length === 0) {
    let dataProduct = productFiltersMap(filtersProduct);
    console.log('filtersProduct!!!!!');
    console.log(filtersProduct);
    console.log(filtersProductAll);
    return dataProduct;
  } else {
    let dataProduct = productFiltersMap(filtersProductAll);
    console.log('filtersProductAll!!!!');
    console.log(filtersProductAll);
    console.log(filtersProduct);
    return dataProduct;
  }

  function filterProducts(array) {
    arrayFilters.forEach(items => {
      array.forEach(item => {
        if (item.title === categoryProduct) {
          for (let key in item) {
            switch (items) {
              case item[key]:
                console.log(item[key]);
                if (!filtersProduct.includes(item)) {
                  filtersProduct.push(item);
                  console.log('filterProducts filtersProduct');
                  console.log(filtersProduct);
                } else {
                  if (!filtersProductAll.includes(item)) {
                    filtersProductAll.push(item);
                    console.log('filterProducts filtersProductAll');
                    console.log(filtersProductAll);
                  }
                }
                break;
              case '2499':
                arrayPush(key, items, item);
                break;
              case '2500-3999':
                arrayPush(key, items, item);
                break;
              case '4000-4499':
                arrayPush(key, items, item);
                break;
              case '4500-4999':
                arrayPush(key, items, item);
                break;
              case '5000-5999':
                arrayPush(key, items, item);
                break;
              case '6000':
                arrayPush(key, items, item);
                break;
              case '6.09':
                arrayPush(key, items, item);
                break;
              case '6.1-6.29':
                arrayPush(key, items, item);
                break;
              case '6.3-6.49':
                arrayPush(key, items, item);
                break;
              case '6.5-6.59':
                arrayPush(key, items, item);
                break;
              case '6.6-6.79':
                arrayPush(key, items, item);
                break;
              case '6.8':
                arrayPush(key, items, item);
                break;
            }
          }
        }
      });
    });
  }

  function arrayPush(key, items, item) {
    let itemsValue = items.split('-');
    if (key === 'battery') {
      if (itemsValue.length == 1) {
        if (itemsValue[0] === '2499') {
          if (+item[key] <= +items) {
            if (!filtersProduct.includes(item)) {
              filtersProduct.push(item);
            } else {
              if (!filtersProductAll.includes(item)) {
                filtersProductAll.push(item);
              }
            }
          }
        } else {
          if (+item[key] >= +items) {
            if (!filtersProduct.includes(item)) {
              filtersProduct.push(item);
            } else {
              if (!filtersProductAll.includes(item)) {
                filtersProductAll.push(item);
              }
            }
          }
        }
      } else {
        if (+itemsValue[0] <= +item[key] && +item[key] <= +itemsValue[1]) {
          if (!filtersProduct.includes(item)) {
            filtersProduct.push(item);
          } else {
            if (!filtersProductAll.includes(item)) {
              filtersProductAll.push(item);
            }
          }
        }
      }
    } else {
      if (itemsValue.length == 1) {
        if (itemsValue[0] === '6.09') {
          if (+item[key] <= +items) {
            if (!filtersProduct.includes(item)) {
              filtersProduct.push(item);
            } else {
              if (!filtersProductAll.includes(item)) {
                filtersProductAll.push(item);
              }
            }
          }
        } else {
          if (+item[key] >= +items) {
            if (!filtersProduct.includes(item)) {
              filtersProduct.push(item);
            } else {
              if (!filtersProductAll.includes(item)) {
                filtersProductAll.push(item);
              }
            }
          }
        }
      } else {
        if (+itemsValue[0] <= +item[key] && +item[key] <= +itemsValue[1]) {
          if (!filtersProduct.includes(item)) {
            filtersProduct.push(item);
          } else {
            if (!filtersProductAll.includes(item)) {
              filtersProductAll.push(item);
            }
          }
        }
      }
    }
  }
}
