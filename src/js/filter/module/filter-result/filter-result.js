'use strict';

import { filterProducts } from './module/filter-products';
import { productFiltersMap } from './module/product-filters-map';

export function filterResult(arrayData, arrayFilters) {
  let categoryProduct = 'smartphones';
  let productFilter = [];

  if (arrayFilters.length === 0) {
    arrayData.forEach(item => {
      if (item.title === categoryProduct && item.brand) {
        productFilter.push(item);
      }
    });
  } else {
    filterProducts(arrayData, categoryProduct, arrayFilters, productFilter);
  }

  let productMaxKey = productFilter.reduce((acc, i) => {
    if (Object.prototype.hasOwnProperty.call(acc, JSON.stringify(i))) {
      acc[JSON.stringify(i)] += 1;
    } else {
      acc[JSON.stringify(i)] = 1;
    }
    return acc;
  }, {});
  console.log(productMaxKey);
  let getMaxKey = obj => {
    let maxValue = Math.max.apply(null, Object.values(obj));
    return Object.keys(obj).filter(k => obj[k] === maxValue);
  };

  let product = getMaxKey(productMaxKey).map(item => {
    return JSON.parse(item);
  });
  console.log(product);
  let dataProduct = productFiltersMap(product);
  return dataProduct;
}
