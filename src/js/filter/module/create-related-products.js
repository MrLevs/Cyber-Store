'use strict';

export function createRelatedProducts(data, arrayRelatedProducts) {
  data.forEach(item => {
    if (item.brand === 'apple') {
      if (arrayRelatedProducts.length < 4) {
        arrayRelatedProducts.push(item);
      }
    }
  });
}
