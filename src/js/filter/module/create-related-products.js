'use strict';

import { createProductCard } from './create-product-card';

export function createRelatedProducts(data, like) {
  const relatedBlock = document.querySelector('#related');
  let relatedProducts = [];

  data.forEach(item => {
    if (item.brand === 'apple') {
      if (relatedProducts.length < 4) {
        relatedProducts.push(item);
      }
    }
  });

  if (relatedBlock) {
    createProductCard(relatedBlock, relatedProducts, like);
  }
}
