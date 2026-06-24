'use strict';

import { createProductCard } from './create-product-card';

export function createRelatedProducts(data, like) {
  const relatedBlock = document.querySelector('#related');
  let relatedProducts = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].brand === 'apple' && relatedProducts.length < 4) {
      relatedProducts.push(data[i]);
    } else {
      break;
    }
  }

  if (relatedBlock) {
    createProductCard(relatedBlock, relatedProducts, like);
  }
}
